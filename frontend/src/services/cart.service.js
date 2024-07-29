import axios from 'axios';

export default class CartService {
  static async addToCart(itemId, token) {
    const response = await axios.post(
      '/cartItems',
      { itemId },
      { headers: { token } }
    );
    return response;
  }

  static async removeFromCart(itemId, token) {
    const response = await axios.delete(`/cartItems/${itemId}`, {
      headers: { token },
    });
    return response;
  }

  static async getCart(token) {
    const response = await axios.get('/cartItems', {
      headers: { token },
    });
    return response;
  }
}
