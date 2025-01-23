import axios from 'axios';

export default class WishListService {
  static async updateWishList(itemData, token) {
    const response = await axios.post('/api/wishlists', itemData, {
      headers: { token },
    });
    return response;
  }

  static async getAllData(token) {
    const response = await axios.get('/api/wishlists', {
      headers: { token },
    });
    return response;
  }

  static async updateListData(listData, token) {
    const response = await axios.post('/api/wishlists/update', listData, {
      headers: { token },
    });
    return response;
  }

  static async removeList(listName, token) {
    const response = await axios.delete(`/api/wishlists/${listName}`, {
      headers: { token },
    });
    return response;
  }
}
