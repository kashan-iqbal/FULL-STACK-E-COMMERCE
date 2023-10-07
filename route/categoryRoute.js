const express = require("express");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getCategoryByIdController,
  deleteCategoryByIdController,
} = require("../controllers/categoryController");

const router = express.Router();

// @method POST
// @acess only admin
// @desc create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// @method PUT
// @acess only admin
// @desc update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// @method GET
// @acess only admin
// @desc get all category
router.get("/category", getAllCategoryController);

// @method GET
// @acess only admin
// @desc get category by name/slug
router.get("/category/:slug", getCategoryByIdController);

// @method DELETE
// @acess only admin
// @desc delete category by id
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryByIdController
);
module.exports = router;
