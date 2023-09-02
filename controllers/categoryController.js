const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

// @method POST
// @acess only admin
// @desc create category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      messsage: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

// @method PUT
// @acess only admin
// @desc update category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Something Went Wrong ",
      });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

// @method GET
// @acess only admin
// @desc get all category
const getAllCategoryController = async (req, res) => {
  try {
    const allCategories = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "Fetched All Categories",
      allCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      error,
    });
  }
};

// @method GET
// @acess only admin
// @desc get category by id

const getCategoryByIdController = async (req, res) => {
  try {
    const getCategoryByName = await categoryModel.find({
      slug: req.params.slug,
    });

    res.status(200).send({
      success: true,
      message: "Get Single Category successfully ",
      getCategoryByName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting categories by name",
      error,
    });
  }
};

// @method DELETE
// @acess only admin
// @desc delete category
const deleteCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while delting category",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getCategoryByIdController,
  deleteCategoryByIdController,
};
