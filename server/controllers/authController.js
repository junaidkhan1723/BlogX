import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE, WELCOME_TEMPLATE } from "../config/emailTemplates.js";

// User Registration Function
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Sending Welcome Email
    var mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome To BlogX',
      html: WELCOME_TEMPLATE.replace(/{{email}}/g, user.email).replace(/{{username}}/g, user.name)
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// User Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and Password are Required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid Email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid Password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// User Logout Function
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send Verification OTP to the User Email with 60-second Cooldown
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const now = Date.now();

    // Atomically find and update the user if cooldown has passed
    const user = await userModel.findOneAndUpdate(
      {
        _id: userId,
        isAccountVerified: false,
        $or: [
          { otpSentAt: null }, // No OTP sent yet
          { otpSentAt: { $lt: new Date(now - 60000) } } // 60 seconds have passed
        ]
      },
      {
        $set: {
          verifyOtp: String(Math.floor(100000 + Math.random() * 900000)),
          verifyOtpExpireAt: now + 15 * 60 * 1000,
          otpSentAt: new Date(now)
        }
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      // Check why the update failed
      const existingUser = await userModel.findById(userId);
      if (!existingUser) {
        return res.json({ success: false, message: "User Not Found" });
      }
      if (existingUser.isAccountVerified) {
        return res.json({ success: false, message: "Account Already Verified" });
      }
      return res.json({ success: false, message: "Please wait before requesting another OTP." });
    }

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Account Verification OTP',
      html: EMAIL_VERIFY_TEMPLATE.replace(/{{otp}}/g, user.verifyOtp)
        .replace(/{{email}}/g, user.email)
        .replace(/{{username}}/g, user.name)
    };

    await transporter.sendMail(mailOption);
    res.json({ success: true, message: 'Verification OTP Sent On Email' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify Email Account
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!otp) {
    return res.json({ success: false, message: 'Missing Details' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    user.otpSentAt = null; // Clear cooldown timestamp

    await user.save();
    return res.json({ success: true, message: 'Email Verified Successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Check if User is Authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Send Password Reset OTP with 60-second Cooldown
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is Required" });
  }

  try {
    const now = Date.now();

    // Atomically find and update the user if cooldown has passed
    const user = await userModel.findOneAndUpdate(
      {
        email,
        $or: [
          { resetOtpSentAt: null }, // No OTP sent yet
          { resetOtpSentAt: { $lt: new Date(now - 60000) } } // 60 seconds have passed
        ]
      },
      {
        $set: {
          resetOtp: String(Math.floor(100000 + Math.random() * 900000)),
          resetOtpExpireAt: now + 15 * 60 * 1000,
          resetOtpSentAt: new Date(now)
        }
      },
      { new: true }
    );

    if (!user) {
      // Check why the update failed
      const existingUser = await userModel.findOne({ email });
      if (!existingUser) {
        return res.json({ success: false, message: "User Not Found" });
      }
      return res.json({ success: false, message: "Please wait before requesting another OTP." });
    }

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      html: PASSWORD_RESET_TEMPLATE.replace(/{{email}}/g, user.email)
        .replace(/{{username}}/g, user.name)
        .replace(/{{otp}}/g, user.resetOtp)
    };

    await transporter.sendMail(mailOption);
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Email, OTP and New Password are Required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    user.resetOtpSentAt = null; // Clear cooldown timestamp

    await user.save();
    return res.json({ success: true, message: "Password has been reset Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};