import userModel from '../models/userModel.js';
import validator from 'validator';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const forgotPassword = async (req, res) => {
  const email = req.body.email;

  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: 'Please enter valid email' });
  }

  const exists = await userModel.findOne({ email });

  if (!exists) {
    return res.json({ success: false, message: `User doesn't exist` });
  }

  let frontend_url = process.env.FRONTEND_URL;

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
export { sendVerificationEmail, forgotPassword };
