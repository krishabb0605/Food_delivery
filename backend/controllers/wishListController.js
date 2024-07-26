import wishListModel from '../models/wishlistModel.js';

const handleWishList = async (req, res) => {
  try {
    let message;

    let wishListObject = await wishListModel.findOne({
      userId: req.body.userId,
      listName: req.body.listName,
    });

    if (!wishListObject) {
      let wishList = new wishListModel({
        userId: req.body.userId,
        listName: req.body.listName,
        wishList: [req.body.itemId],
      });

      message = 'Item added to wishlist ';

      await wishList.save();
    } else {
      let wishListData = wishListObject.wishList;

      if (wishListData.includes(req.body.itemId)) {
        wishListData.splice(wishListData.indexOf(req.body.itemId), 1);
        message = 'Item removed from wishlist';
      } else {
        wishListData.push(req.body.itemId);
        message = 'Item added to wishlist ';
      }

      wishListObject.wishList = wishListData;

      await wishListObject.save();
    }

    res.json({ success: true, message });
  } catch (error) {
    return res.json({
      success: false,
      message: 'WishList item not updated ',
    });
  }
};

const getWishList = async (req, res) => {
  try {
    const wishListData = await wishListModel.findOne({
      userId: req.body.userId,
      listName: req.body.listName,
    });

    res.json({
      success: true,
      wishList: wishListData.wishList,
    });
  } catch (error) {
    return res.json({ success: false, message: 'Error' });
  }
};

const getAllData = async (req, res) => {
  try {
    const wishListData = await wishListModel.find({
      userId: req.body.userId,
    });

    res.json({
      success: true,
      data: wishListData,
    });
  } catch (error) {
    return res.json({ success: false, message: 'Error' });
  }
};

export { handleWishList, getWishList, getAllData };
