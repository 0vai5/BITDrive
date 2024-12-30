import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  userSignInSchema,
  userSignUpSchema,
  userUpdateSchema,
} from "../utils/userSchemaValidation.js";

const userController = {
  async signUpUser(req, res) {
    try {
      const { error } = userSignUpSchema.validate(req.body);

      if (error) {
        return res.json({
          message: error.message,
          status: 401,
        });
      }

      const { email, password, name } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.json({
          message: "User already exists",
          status: 400,
        });
      }

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      return res.json({
        message: "User created successfully",
        status: 201,
        data: user,
      });
    } catch (error) {
      return res.json({
        status: 500,
        message: error.message,
      });
    }
  },

  async signInUser(req, res) {
    try {
      const { error } = userSignInSchema.validate(req.body);

      if (error) {
        return res.json({
          message: error.message,
          status: 401,
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          message: "User not found",
          status: 404,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          message: "Invalid credentials",
          status: 401,
        });
      }

      const tokenData = {
        id: user._id,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
        path: "/",
      });

      return res.json({
        message: "logged in successfully",
        status: 200,
        token,
        data: user,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },

  async getUserProfile(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          message: "User not found",
          status: 404,
        });
      }

      return res.json({
        message: "User profile fetched successfully",
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const { error } = userUpdateSchema.validate(req.body);

      if (error) {
        return res.json({
          message: error.message,
          status: 401,
        });
      }

      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          message: "User not found",
          status: 404,
        });
      }

      const userObj = {};

      if (req.body.email) userObj.email = req.body.email;
      if (req.body.name) userObj.name = req.body.name;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        userObj.password = await bcrypt.hash(req.body.password, salt);
      }

      if (userId !== req.user.id) {
        return res.json({
          message: "You are not authorized to perform this action",
          status: 401,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, userObj, {
        new: true,
      });

      return res.json({
        message: "User profile updated successfully",
        status: 200,
        data: updatedUser,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      if (!users) {
        return res.json({
          message: "No users found",
          status: 404,
        });
      }

      return res.json({
        message: "All users fetched successfully",
        status: 200,
        data: users,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          message: "No User Exists",
          status: 404,
        });
      }

      if (userId !== req.user.id) {
        return res.json({
          message: "You are not Authorized to Send this Request",
          status: 401,
        });
      }

      const userDelete = await User.deleteOne(userId);

      if (!userDelete) {
        return res.json({
          message: "Bad Request",
          status: 400,
        });
      }

      return res.json({
        message: "Successfully Deleted the User",
        status: 200,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },

  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      console.log("User ID from token:", userId);

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          message: "The User Doesn't Exists",
          status: 404,
        });
      }

      return res.json({
        message: "Successfully Fetched Data",
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },

  async logoutUser(req, res) {
    try {
      res.clearCookie("token", { path: "/" });

      return res.json({
        message: "Successfully! Logged Out",
        status: 200,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        status: 500,
      });
    }
  },
};

export default userController;
