import axios from 'axios';

export default class orderService {
  static async placeOrder(orderData, token) {
    const response = await axios.post('/api/order/place', orderData, {
      headers: { token },
    });
    return response;
  }

  static async verifyOrder(success, orderId) {
    const response = await axios.post('/api/order/verify', {
      success,
      orderId,
    });
    return response;
  }

  static async usersOrder(token) {
    const response = await axios.post(
      `/api/order/userOrders`,
      {},
      { headers: { token } }
    );
    return response;
  }

  static async listOrder() {
    const response = await axios.get(`/api/order/list`);
    return response;
  }

  static async updateStatus(orderId, status) {
    const response = await axios.post('/api/order/status', {
      orderId,
      status,
    });
    return response;
  }
}