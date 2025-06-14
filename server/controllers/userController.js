import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  userSignInSchema,
  userSignUpSchema,
  userUpdateSchema,
} from "../utils/userSchemaValidation.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { CustomError } from "../utils/customError.js";

export const userController = {
  async signUpUser(req, res) {
    try {
      const { error } = userSignUpSchema.validate(req.body);

      if (error) throw new CustomError(error.message, 401);

      const { email, password, name } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) throw new CustomError("User already exists", 400);

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (!user) throw new CustomError("User not created", 500);

      return res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", user));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async signInUser(req, res) {
    try {
      const { error } = userSignInSchema.validate(req.body);
      if (error) throw new CustomError(error.message, 401);

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw new CustomError("Invalid credentials", 401);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new CustomError("Invalid credentials", 401);

      const tokenData = {
        id: user._id,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const options = {
        maxAge: 3600 * 1000,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

      return res
        .status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(200, "User logged in", user, token));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async getUserProfile(req, res) {
    try {
      const { id } = req.user;

      const user = await User.findById(id);

      if (!user) throw new CustomError("User not found", 404);
      return res.status(200).json(new ApiResponse(200, "User found", user));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async updateUserProfile(req, res) {
    try {
      const { error } = userUpdateSchema.validate(req.body);

      if (error) throw new CustomError(error.message, 400);

      const { id } = req.user;

      const user = await User.findById(id);

      if (!user) throw new CustomError("User not found", 404);

      const userObj = {};

      if (req.body.email) userObj.email = req.body.email;
      if (req.body.name) userObj.name = req.body.name;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        userObj.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(id, userObj, {
        new: true,
      });

      return res
        .status(200)
        .json(new ApiResponse(200, "User updated", updatedUser));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      if (!users) throw new CustomError("No users found", 404);

      return res.status(200).json(new ApiResponse(200, "Users Found", users));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) throw new CustomError("User not found", 404);

      if (userId !== req.user.id) throw new CustomError("Unauthorized", 401);

      const userDelete = await User.deleteOne(user);

      if (!userDelete) throw new CustomError("User not deleted", 500);

      res.clearCookie("token", { path: "/" });

      return res.status(200).json(new ApiResponse(200, "User deleted"));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user) throw new CustomError("User not Found", 404);

      return res.status(200).json(new ApiResponse(200, "User Found", user));
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(new ApiResponse(error.status || 500, error.message));
    }
  },

  async logoutUser(req, res) {
    try {
      res.clearCookie("token", { path: "/" });

      return res.status(200).json(new ApiResponse(200, "User logged out"));
    } catch (error) {
      return res.status(500).json(new ApiResponse(500, error.message));
    }
  },
};
