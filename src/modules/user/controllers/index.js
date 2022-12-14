import getProfileDetails from "./profile/profileDetails.js";
import changePassword from "./profile/changePassword.js";
import updateProfile from "./profile/updateProfile.js";
import uploadProfilePicture from "./profile-picture/uploadProfilePic.js";
import removeProfilePicture from "./profile-picture/removeProfilePic.js";
import followUser from "./follow-user/followUser.js";
import getUserDetails from "./user/getUserDetails.js";
import getFollowers from "./followers/getFollowers.js";
import getFollowings from "./followings/getFollowings.js";
import sendEmailVerificationOtp from "./profile/sendEmailVerificationOtp.js";
import verifyEmail from "./profile/verifyEmail.js";
import changeUsername from "./profile/changeUsername.js";
import checkUsernameAvailable from "./check-username/checkUsernameAvailable.js";
import deleteProfile from "./profile/deleteProfile.js";
import searchUser from "./user/searchUser.js";
import getRecommendedUsers from "./recommend-users/getRecommendedUsers.js";
import saveDeviceInfo from "./device-info/saveDeviceInfo.js";
import getUserDeviceInfo from "./device-info/getUserDeviceInfo.js";
import deleteDeviceInfo from "./device-info/deleteDeviceInfo.js";
import acceptFollowRequest from "./follow-user/acceptFollowRequest.js";
import cancelFollowRequest from "./follow-user/cancelFollowRequest.js";
import removeFollowRequest from "./follow-user/removeFollowRequest.js";
import getUserPosts from "./user/getUserPosts.js";
import getFollowRequests from "./profile/getFollowRequests.js";
import deactivateAccount from "./profile/deactivateAccount.js";

const userController = {};

userController.getProfileDetails = getProfileDetails;
userController.changePassword = changePassword;
userController.updateProfile = updateProfile;
userController.uploadProfilePicture = uploadProfilePicture;
userController.removeProfilePicture = removeProfilePicture;
userController.followUser = followUser;
userController.getUserDetails = getUserDetails;
userController.getFollowers = getFollowers;
userController.getFollowings = getFollowings;
userController.sendEmailVerificationOtp = sendEmailVerificationOtp;
userController.verifyEmail = verifyEmail;
userController.changeUsername = changeUsername;
userController.checkUsernameAvailable = checkUsernameAvailable;
userController.deleteProfile = deleteProfile;
userController.searchUser = searchUser;
userController.getRecommendedUsers = getRecommendedUsers;
userController.saveDeviceInfo = saveDeviceInfo;
userController.getUserDeviceInfo = getUserDeviceInfo;
userController.deleteDeviceInfo = deleteDeviceInfo;
userController.acceptFollowRequest = acceptFollowRequest;
userController.cancelFollowRequest = cancelFollowRequest;
userController.removeFollowRequest = removeFollowRequest;
userController.getUserPosts = getUserPosts;
userController.getFollowRequests = getFollowRequests;
userController.deactivateAccount = deactivateAccount;

export default userController;