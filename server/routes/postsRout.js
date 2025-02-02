const router = require("express").Router();
const { createPostCtrl, GetAllPostsCtrl, GetSinglePostCtrl, GetPostCountCtrl, DeletePostCtrl, UpdatePostCtrl, UpdatePostImageCtrl, ToggleLikeCtrl } = require("../controllers/postsController");
const { photoUpload } = require("../middlewares/photoUpload");
const {verifyToken} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId")

// api/posts/
router.post("/", verifyToken, photoUpload.single("image") ,createPostCtrl);

// api/posts
router.get("/", GetAllPostsCtrl);

// api/posts/count
router.get("/count", GetPostCountCtrl);


// api/posts/:id
router.get("/:id", validateObjectId, GetSinglePostCtrl);


// api/posts/:id
router.delete("/:id", validateObjectId, verifyToken, DeletePostCtrl);

// api/posts/:id
router.put("/:id", validateObjectId, verifyToken, UpdatePostCtrl);


// api/posts/:id
router.put("/update-image/:id", verifyToken, photoUpload.single("image"), UpdatePostImageCtrl);


// api/posts/likes/:id
router.put("/likes/:id", validateObjectId, verifyToken, ToggleLikeCtrl);

module.exports = router;