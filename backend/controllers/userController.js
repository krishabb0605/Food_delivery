import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bycrpt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatched = await bycrpt.compare(password, user.password);
    if (!isMatched) {
      return res.json({ success: false, message: 'Invalid creditials' });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user

const registerUser = async (req, res) => {
  const { role, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    // check if user already exist
    if (exists) {
      return res.json({ success: false, message: `${role} already exist` });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter valid email' });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter a strong password',
      });
    }

    // encrypt the password we use bycrpt
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const newUser = new userModel({
      role: role,
      email: email,
      password: hashedPassword,
      verified: false,
      verificationToken: Math.floor(Math.random() * 900000) + 100000,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
  }
};

const sendVerificationEmail = async (req, res) => {
  const { user } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Verify Your Email Address',
    html: `<p>Your verification code: <code>${user.verificationToken}</code></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email send successfully' });
  } catch (error) {
    console.log('Email not sent', error);
  }
};

const verifyUser = async (req, res) => {
  const token = req.params.token;

  // Find the user with the matching verification token
  const user = await userModel.findOne({ verificationToken: token });

  if (!user) {
    return res.json({ success: false, message: 'Invalid token' });
  }

  // Update the user's verified status and remove the verification token
  user.verified = true;
  user.verificationToken = '';

  try {
    await user.save();
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: 'Failed to verify email',
    });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.params.email;

  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: 'Please enter valid email' });
  }

  const exists = await userModel.findOne({ email });

  if (!exists) {
    return res.json({ success: false, message: `User doesn't exist` });
  }

  let frontend_url = 'https://fooddelivery-mern.netlify.app';
  if (process.env.ENV !== 'production') {
    frontend_url = 'http://localhost:5173';
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Reset password',
    html: `<p>Click on link to reset password: <code>${frontend_url}/forgot-password?email=${email}</code></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email send successfully' });
  } catch (error) {
    console.log('Email not sent', error);
    res.json({ success: false, message: 'Failed to send email' });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    // check if user already exist
    if (!user) {
      return res.json({
        success: false,
        message: `user doesn't already exist`,
      });
    }

    // encrypt the password we use bycrpt
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();
    res.json({ success: true, message: 'Password updated successfully .' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while updating password !' });
  }
};
export {
  loginUser,
  registerUser,
  verifyUser,
  sendVerificationEmail,
  forgotPassword,
  resetPassword,
};
