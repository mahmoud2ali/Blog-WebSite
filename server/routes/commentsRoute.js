const router = require("express").Router();
const {createCommentCtrl, getAllCommentsCtlr, deleteCommentCtrl, updateCommentCtrl} = require("../controllers/commentsController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");


// api/comments
router.post("/", verifyToken, createCommentCtrl);

router.get("/", verifyTokenAndAdmin, getAllCommentsCtlr);

// api/comments/:id
router.delete("/:id", validateObjectId, verifyToken, deleteCommentCtrl);

// api/comments/:id
router.put("/:id", verifyToken, updateCommentCtrl);


module.exports = router;