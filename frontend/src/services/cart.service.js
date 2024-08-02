import axios from 'axios';

export default class CartService {
  static async getCart(token) {
    const response = await axios.get('/cartItems', {
      headers: { token },
    });
    return response;
  }

  static async updateCart(token, cartData) {
    const response = await axios.post('/cartItems', cartData, {
      headers: { token },
    });
    return response;
  }
}
