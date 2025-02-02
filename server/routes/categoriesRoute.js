const router = require("express").Router();
const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController");
const validateObjectId = require("../middlewares/validateObjectId");
const {verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// /api/categories
router.post("/", verifyTokenAndAdmin, createCategoryCtrl)
router.get("/", getAllCategoriesCtrl)

// api/categories/:id
router.delete("/:id", validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl)


module.exports = router;