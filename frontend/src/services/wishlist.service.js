import axios from 'axios';

export default class WishListService {
  static async updateWishList(itemData, token) {
    const response = await axios.post('/api/wishlist/update', itemData, {
      headers: { token },
    });
    return response;
  }

  static async getWishList(listName, token) {
    const response = await axios.post(
      '/api/wishlist/get',
      { listName },
      {
        headers: { token },
      }
    );
    return response;
  }

  static async getAllData(token) {
    const response = await axios.post(
      '/api/wishlist/all',
      {},
      {
        headers: { token },
      }
    );
    return response;
  }

  static async renameList(data, token) {
    const response = await axios.post('/api/wishlist/rename', data, {
      headers: { token },
    });
    return response;
  }

  static async removeList(listName, token) {
    const response = await axios.post(
      '/api/wishlist/remove',
      { listName },
      {
        headers: { token },
      }
    );
    return response;
  }
}
