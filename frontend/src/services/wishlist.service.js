import axios from 'axios';

export default class WishListService {
  static async updateWishList(itemData, token) {
    const response = await axios.post('/wishlistItems', itemData, {
      headers: { token },
    });
    return response;
  }

  static async getAllData(token) {
    const response = await axios.get('/wishlistItems', {
      headers: { token },
    });
    return response;
  }

  static async updateListData(listData, token) {
    const response = await axios.post('/wishlistItems/update', listData, {
      headers: { token },
    });
    return response;
  }

  static async removeList(listName, token) {
    const response = await axios.delete(`/wishlistItems/${listName}`, {
      headers: { token },
    });
    return response;
  }
}
