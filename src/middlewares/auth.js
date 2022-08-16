import jwt from "jsonwebtoken";
import ErrorHandler from "../helpers/errorHandler.js";
import catchAsyncError from "../helpers/catchAsyncError.js";
import models from "../models/index.js";
import utility from "../utils/utility.js";

const authMiddleware = {};

authMiddleware.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    return next(new ErrorHandler("Auth header is missing.", 404));
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  if (!token) {
    return next(new ErrorHandler("Auth token not found.", 404));
  }

  const userData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await models.User.findById(userData.id);

  const message = await utility.checkUserAccountStatus(req.user.accountStatus);

  if (message) {
    return next(new ErrorHandler(message, 404));
  }

  next();
});

// AUthorize Roles
authMiddleware.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`User is not allowed to access this resource.`, 403)
      );
    }

    next();
  };
};

export default authMiddleware;