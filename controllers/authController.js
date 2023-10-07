const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }

    if (!phone) {
      return res.send({ message: "Phone is required" });
    }

    if (!address) {
      return res.send({ message: "Address is required" });
    }

    if (!answer) {
      return res.send({ message: "Answer  is required" });
    }
    // existing user check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }
    // regsiter new user
    const hasedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hasedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Register Sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// login controller

const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User with this Email does not exist",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// forgot-password controller
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword, confirmPassword } = req.body;

    // validation check
    if (!email || !answer || !newPassword || !confirmPassword) {
      return res.send({ success: false, message: "All fileds are required" });
    }

    if (confirmPassword !== newPassword) {
      return res.send({ success: false, message: "Password does not match " });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.send({ success: false, message: "Wrong Email or Answer" });
    }

    const oldPassword = await comparePassword(newPassword, user.password);
    console.log(oldPassword);
    if (oldPassword) {
      return res.send({
        success: false,
        message: "New password required, Update now",
      });
    }

    const newPasswordHash = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: newPasswordHash });
    res.status(200).send({
      success: true,
      message: "Password Change Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test func
const tester = (req, res) => {
  res.send("Protected Route");
};

// update profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    // check password
    if (password && password.lenght < 6) {
      return res.json({ error: "password is required and 6 characters long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};

const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Orders",
      error,
    });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Orders",
      error,
    });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Order Status",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  tester,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
};
