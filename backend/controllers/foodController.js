import foodModel from '../models/foodModel.js';
// prebuilt file system in node js
import fs from 'fs';

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while adding food' });
  }
};

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while fetching food list' });
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // delete image from folder
    fs.unlink(`uploads/${food.image}`, () => {});

    // in mongodb it delete
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: 'Food removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while removing food' });
  }
};

const updateFood = async (req, res) => {
  const id = req.params.id;

  try {
    const food = await foodModel.findById(id);
    if (req.file) {
      fs.unlink(`uploads/${food.image}`, () => {});
      food.image = req.file.filename;
    }
    if (req.body.name) {
      food.name = req.body.name;
      food.description = req.body.description;
      food.price = req.body.price;
      food.category = req.body.category;
    }

    await food.save();
    res.json({ success: true, message: 'Food item updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while updating Food' });
  }
};

export { addFood, listFood, removeFood, updateFood };
