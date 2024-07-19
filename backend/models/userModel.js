import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avtar: { type: String },
    verified: { type: Boolean, required: true },
    verificationToken: { type: Number },
    cartData: { type: Object, default: {} },
  },
  { minimize: false, versionKey: false }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
