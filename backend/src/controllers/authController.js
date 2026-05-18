import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender,
      age,
      fitnessGoal,
      emergencyContactName,
      emergencyContactPhone,
      medicalConditions,
    } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: "member",
      gender: gender || "",
      age: age || null,
      fitnessGoal: fitnessGoal || "",
      emergencyContactName: emergencyContactName || "",
      emergencyContactPhone: emergencyContactPhone || "",
      medicalConditions: medicalConditions || "",
    });

    user.qrCode = `QR-${user.memberId}`;
    await user.save();

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: user._id,
        memberId: user.memberId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        fitnessGoal: user.fitnessGoal,
        membership: user.membership,
        qrCode: user.qrCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed.",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Contact gym admin.",
      });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        memberId: user.memberId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        fitnessGoal: user.fitnessGoal,
        membership: user.membership,
        qrCode: user.qrCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed.",
      error: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch profile.",
      error: error.message,
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      gender,
      age,
      fitnessGoal,
      emergencyContactName,
      emergencyContactPhone,
      medicalConditions,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.age = age || user.age;
    user.fitnessGoal = fitnessGoal || user.fitnessGoal;
    user.emergencyContactName =
      emergencyContactName || user.emergencyContactName;
    user.emergencyContactPhone =
      emergencyContactPhone || user.emergencyContactPhone;
    user.medicalConditions = medicalConditions || user.medicalConditions;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser._id,
        memberId: updatedUser.memberId,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        gender: updatedUser.gender,
        age: updatedUser.age,
        fitnessGoal: updatedUser.fitnessGoal,
        emergencyContactName: updatedUser.emergencyContactName,
        emergencyContactPhone: updatedUser.emergencyContactPhone,
        medicalConditions: updatedUser.medicalConditions,
        membership: updatedUser.membership,
        qrCode: updatedUser.qrCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update profile.",
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful. Remove token from frontend localStorage.",
  });
};