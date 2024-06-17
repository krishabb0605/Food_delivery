import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bycrpt from 'bcrypt';
import validator from 'validator';

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
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
  }
};

export { loginUser, registerUser };
