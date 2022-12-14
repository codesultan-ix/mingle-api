// import cloudinary from "cloudinary";
// import fs from "fs";
// import path from "path";
// import catchAsyncError from "../../../../helpers/catchAsyncError.js";
// import ErrorHandler from "../../../../helpers/errorHandler.js";
// import models from "../../../../models/index.js";

// /// CREATE POST ///

// const createNewPost = catchAsyncError(async (req, res, next) => {
//   const mediaFiles = req.files;
//   const videoFilesTypes = [".mp4", ".mkv"];

//   if (!mediaFiles || mediaFiles?.length <= 0) {
//     return next(new ErrorHandler("media file is required", 400));
//   }

//   for (let i = 0; i < mediaFiles.length; i++) {
//     let tempFile = mediaFiles[i];

//     const fileSize = tempFile.size / 1024;
//     let ext = path.extname(tempFile.originalname);

//     if (videoFilesTypes.includes(ext)) {
//       if (fileSize > 30 * 1024) {
//         return next(
//           new ErrorHandler("video file size must be lower than 30mb", 413)
//         );
//       }
//     } else {
//       if (fileSize > 2048) {
//         return next(
//           new ErrorHandler("image file size must be lower than 2mb", 413)
//         );
//       }
//     }
//   }

//   let mediaFilesLinks = [];

//   for (let i = 0; i < mediaFiles.length; i++) {
//     let fileTempPath = mediaFiles[i].path;
//     let fileExt = path.extname(mediaFiles[i].originalname);

//     if (videoFilesTypes.includes(fileExt)) {
//       await cloudinary.v2.uploader
//         .upload(fileTempPath, {
//           folder: "social_media_api/posts/videos",
//           resource_type: "video",
//           chunk_size: 6000000,
//         })
//         .then(async (result) => {
//           mediaFilesLinks.push({
//             link: {
//               public_id: result.public_id,
//               url: result.secure_url,
//             },
//             mediaType: "video",
//           });

//           fs.unlink(fileTempPath, (err) => {
//             if (err) console.log(err);
//           });
//         })
//         .catch((err) => {
//           fs.unlink(fileTempPath, (fileErr) => {
//             if (fileErr) console.log(fileErr);
//           });

//           console.log(err);

//           res.status(400).json({
//             success: false,
//             message: "video upload failed",
//           });
//         });
//     } else {
//       await cloudinary.v2.uploader
//         .upload(fileTempPath, {
//           folder: "social_media_api/posts/images",
//         })
//         .then(async (result) => {
//           mediaFilesLinks.push({
//             link: {
//               public_id: result.public_id,
//               url: result.secure_url,
//             },
//             mediaType: "image",
//           });

//           fs.unlink(fileTempPath, (err) => {
//             if (err) console.log(err);
//           });
//         })
//         .catch((err) => {
//           fs.unlink(fileTempPath, (fileErr) => {
//             if (fileErr) console.log(fileErr);
//           });

//           console.log(err);

//           res.status(400).json({
//             success: false,
//             message: "image upload failed",
//           });
//         });
//     }
//   }

//   // console.log(mediaFilesLinks);

//   const newPost = {
//     caption: req.body.caption,
//     owner: req.user._id,
//   };

//   newPost.mediaFiles = mediaFilesLinks;

//   const post = await models.Post.create(newPost);

//   const user = await models.User.findById(req.user._id);

//   user.posts.push(post._id);

//   await user.save();

//   res.status(201).json({
//     success: true,
//     message: "post created successfully",
//   });
// });

// export default createNewPost;

// import catchAsyncError from "../../../../helpers/catchAsyncError.js";
// import ErrorHandler from "../../../../helpers/errorHandler.js";
// import models from "../../../../models/index.js";

// /// CREATE POST ///

// const createPost = catchAsyncError(async (req, res, next) => {
//   let { mediaFiles, caption } = req.body;

//   if (!mediaFiles || mediaFiles?.length <= 0) {
//     return next(new ErrorHandler("media file is required", 400));
//   }

//   const newPost = {
//     owner: req.user._id,
//     caption: caption,
//     mediaFiles: mediaFiles,
//   };

//   const post = await models.Post.create(newPost);

//   const user = await models.User.findById(req.user._id);

//   user.posts.push(post._id);

//   await user.save();

//   res.status(201).json({
//     success: true,
//     message: "post created successfully",
//   });
// });

// export default createPost;

import catchAsyncError from "../../../../helpers/catchAsyncError.js";
import ErrorHandler from "../../../../helpers/errorHandler.js";
import models from "../../../../models/index.js";
import utility from "../../../../utils/utility.js";

/// CREATE POST ///

const createPost = catchAsyncError(async (req, res, next) => {
  let { mediaFiles, caption } = req.body;

  if (!mediaFiles || mediaFiles?.length <= 0) {
    return next(new ErrorHandler("media file is required", 400));
  }

  for (let i = 0; i < mediaFiles.length; i++) {
    if (!mediaFiles[i].public_id) {
      return next(new ErrorHandler("media file public_id is required", 400));
    }
    if (!mediaFiles[i].url) {
      return next(new ErrorHandler("media file url is required", 400));
    }
    if (!mediaFiles[i].mediaType) {
      return next(new ErrorHandler("media file type is required", 400));
    }
  }

  const newPost = {
    owner: req.user._id,
    caption: caption,
    mediaFiles: mediaFiles,
  };

  const post = await models.Post.create(newPost);

  const user = await models.User.findById(req.user._id);

  user.posts.push(post._id);
  user.postsCount++;

  await user.save();

  const ownerData = await utility.getOwnerData(post.owner, req.user);

  const isLiked = await utility.checkIfPostLiked(post._id, req.user);

  const postData = {};
  postData._id = post._id;
  postData.caption = post.caption;
  postData.mediaFiles = post.mediaFiles;
  postData.owner = ownerData;
  postData.likesCount = post.likesCount;
  postData.commentsCount = post.commentsCount;
  postData.isLiked = isLiked;
  postData.postStatus = post.postStatus;
  postData.createdAt = post.createdAt;

  res.status(201).json({
    success: true,
    message: "post created successfully",
    post: postData,
  });
});

export default createPost;