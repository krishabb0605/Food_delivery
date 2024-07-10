import categoryModel from '../models/categoryModel.js';
import fs from 'fs';

const addCategory = async (req, res) => {
  const image = `${req.file.filename}`;

  try {
    const isExist = await categoryModel.findOne({ name: req.body.name });

    if (isExist) {
      fs.unlink(`uploads/${image}`, () => {});
      return res.json({
        success: false,
        message: 'Category already exist !!',
      });
    }

    const category = new categoryModel({
      name: req.body.name,
      image: image,
    });
    await category.save();
    res.json({ success: true, message: 'Category added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while adding category' });
  }
};

const listCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while fetching category' });
  }
};

const removeCateogry = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.body.id);

    // delete image from folder
    fs.unlink(`uploads/${category.image}`, () => {});

    // in mongodb it delete
    await categoryModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: 'Category removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error while removing category' });
  }
};

export { addCategory, listCategory, removeCateogry };
