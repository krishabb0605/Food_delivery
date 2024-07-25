import axios from 'axios';

export default class CartService {
  static async addToCart(itemId, token) {
    const response = await axios.post(
      '/api/cart/add',
      { itemId },
      { headers: { token } }
    );
    return response;
  }

  static async removeFromCart(itemId, token) {
    const response = await axios.post(
      '/api/cart/remove',
      { itemId },
      { headers: { token } }
    );
    return response;
  }

  static async getCart(token) {
    const response = await axios.post(
      '/api/cart/get',
      {},
      {
        headers: { token },
      }
    );
    return response;
  }
}
