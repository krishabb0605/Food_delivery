import axios from 'axios';

export default class OrderService {
  static async placeOrder(orderData, token) {
    const response = await axios.post('/orders', orderData, {
      headers: { token },
    });
    return response;
  }

  static async verifyOrder(success, orderId, id) {
    const response = await axios.post('/orders/verify', {
      success,
      orderId,
      id,
    });
    return response;
  }

  static async usersOrder(token) {
    const response = await axios.get(`/orders/order`, {
      headers: { token },
    });
    return response;
  }

  static async listOrder() {
    const response = await axios.get(`/orders`);
    return response;
  }

  static async updateStatus(id, status) {
    const response = await axios.post('/orders/status', { id, status });
    return response;
  }
}
