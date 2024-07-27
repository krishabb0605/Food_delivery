import mongoose from 'mongoose';

// create schema where we described foodmodel property

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: { type: Array, required: true },
});

// creating model
// we can create this mode only once but when we run each time it create model
// mongoose.models.food using this if it already there then use it

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
export default foodModel;
