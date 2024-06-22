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
      user: 'krishabhingaradiya1234@gmail.com',
      pass: 'comjqbcqomsdcazk',
    },
  });

  const mailOptions = {
    from: 'krishabhingaradiya1234@gmail.com',
    to: user.email,
    subject: 'Verify Your Email Address',
    html:`<p>Your verification code: <code>${user.verificationToken}</code></p>`
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

export { loginUser, registerUser, verifyUser, sendVerificationEmail };
