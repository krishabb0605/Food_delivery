import userModel from '../models/userModel.js';

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

// update cart data
const updateCartData = async (req, res) => {
  console.log(req.body.userId);
  console.log(req.body.cartData);

  try {
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: req.body.cartData,
    });

    res.json({ success: true, message: 'Cart data updated' });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: 'Error while updating cartData',
    });
  }
};

export { getCart, updateCartData };
