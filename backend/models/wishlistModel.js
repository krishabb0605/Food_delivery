import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    listName: { type: String, default: 'List 1' },
    wishList: { type: Array, default: [] },
  },
  { minimize: false, versionKey: false }
);

const wishListModel =
  mongoose.models.wishList || mongoose.model('wishList', userSchema);

export default wishListModel;
