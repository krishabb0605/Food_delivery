import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bycrpt from 'bcrypt';
import validator from 'validator';
import 'dotenv/config';
import axios from 'axios';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

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

const verifyUser = async (req, res) => {
  const token = req.body.token;

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

const updatePassword = async (req, res) => {
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

const signInWithGoogle = async (req, res) => {
  const { access_token } = req.body;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }
    );

    const { email, verified_email, picture } = response.data;
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      const token = createToken(existUser._id);
      return res.json({ success: true, token, user: existUser });
    } else {
      const salt = await bycrpt.genSalt(10);
      let password = Math.floor(Math.random() * 900000) + 100000;
      password = password.toString();
      const hashedPassword = await bycrpt.hash(password, salt);
      const newUser = new userModel({
        role: 'user',
        email,
        password: hashedPassword,
        verified: verified_email,
        verificationToken: '',
        avtar: picture,
      });

      const user = await newUser.save();
      const token = createToken(user._id);
      res.json({ success: true, token, user });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while signing in' });
  }
};

export {
  loginUser,
  registerUser,
  verifyUser,
  updatePassword,
  signInWithGoogle,
};
