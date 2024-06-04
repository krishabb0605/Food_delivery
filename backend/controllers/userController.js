import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bycrpt from 'bcrypt';
import validator from 'validator';

// login user

const loginUser = async (req, res) => {};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  console.log('req', req.body);
  try {
    const exists = await userModel.findOne({ email });
    // check if user already exist
    if (exists) {
      return res.json({ success: false, message: 'User already exist' });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      console.log('Email is invalid!!!');
      return res.json({ success: false, message: 'Please enter valid email' });
    }

    if (password.lenth < 8) {
      console.log('less than 8');
      return res.json({
        success: false,
        message: 'Please enter a strong password',
      });
    }

    // encrypt the password we use bycrpt
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true }, token);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
  }
};

export { loginUser, registerUser };
