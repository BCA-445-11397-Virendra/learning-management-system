import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Invalid Server Error",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email and Password",
        success: false,
      });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Invalid Email and Password",
        success: false,
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Invalid Server Error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", " ", { maxAge: 0 }).json({
      message: "LogOut Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Invalid Server Error",
      success: false,
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "User-Profile Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Invalid Server Error",
      success: false,
    });
  }
};

export const updateProfileUser = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const { name, phoneNumber, goals, location } = req.body || {};
    const profileUrl = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updateData = {
      name,
      phoneNumber,
      goals,
      location,
    };

    
    if (profileUrl) {
      // Delete old image
      if (user.profileUrl) {
        const publicId = user.profileUrl.split("/").pop().split(".")[0];

        await deleteMediaFromCloudinary(publicId);
      }

      const cloudResponse = await uploadMedia(profileUrl.path);
      updateData.profileUrl = cloudResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while updating profile",
      success: false,
    });
  }
};
