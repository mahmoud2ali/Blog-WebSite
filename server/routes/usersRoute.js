const router = require("express").Router();
const { getAllUsersCtrl, getUserProfileCtrl, UpdateUserProfile, getUsersCountCtrl, ProfilePhotoUploadCtrl, deleteUserProfileCtrl } = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const { photoUpload } = require("../middlewares/photoUpload");


// api/users/profile
router.get("/profile", verifyTokenAndAdmin ,getAllUsersCtrl)

// api/users/profile/:id
// router.get("/profile/:id", validateObjectId, getUserProfileCtrl);
router.route("/profile/:id").get(validateObjectId, getUserProfileCtrl).put(validateObjectId, verifyTokenAndOnlyUser, UpdateUserProfile);


// api/users/profile/profile-photo-upload
router.post("/profile/profile-photo-upload", verifyToken, photoUpload.single("image"),ProfilePhotoUploadCtrl);


// api/users/profile/:id
router.delete("/profile/:id", validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);


// api/users/count
router.get("/count", verifyTokenAndAdmin ,getUsersCountCtrl)



module.exports = router;