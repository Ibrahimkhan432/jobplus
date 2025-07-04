import User from "../../models/userSchema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../../utils/dataUri.js";
import cloudinary from "../../utils/cloudinary.js";

// reigster user first time
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "please fill all fields",
        success: false,
      });
    }

    // const file = req.file;
    // let profilePhotoUrl = "";
    // if (file) {
    //   const fileUri = getDataUri(file);
    //   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    //   profilePhotoUrl = cloudResponse.secure_url;
    // }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "please fill all fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    // if (role !== user.role) {
    //   return res.status(400).json({
    //     message: "Account doesn't exist with current role.",
    //     success: false,
    //   });
    // }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// user logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// user profile update
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

  
    console.log("fullName =>", fullName);
    console.log("email =>", email);
    console.log("phoneNumber =>", phoneNumber);
    console.log("bio =>", bio);
    console.log("skills =>", skills);

    console.log("Files =>", req.files)

    // resume
    // let cloudResponse;
    // if (file) {
    //   console.log("req.file", req.file);
    //   const fileUri = getDataUri(file);
    //   if (fileUri) {
    //     cloudResponse = await cloudinary.uploader.upload(fileUri.content),
    //       { resource_type: "raw" }
    //   }
    // }

// // profilePhoto
// const file = req.file;
// let profilePhotoUrl = "";
// if (file) {
//   const fileUri = getDataUri(file);
//   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//   profilePhotoUrl = cloudResponse.secure_url;
// }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    // await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      skills: user.skills,
      profilePhoto: user.profilePhoto,

    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


