import axios from 'axios';

export default class foodService {
  static async addFood(foodData) {
    const response = await axios.post('/api/food/add', foodData);
    return response;
  }

  static async listFood() {
    const response = await axios.get('/api/food/list');
    return response;
  }

  static async removeFood(id) {
    const response = await axios.post(`/api/food/remove`, { id });
    return response;
  }

  static async updateFood(id, data) {
    const response = await axios.post(`/api/food/update/${id}`, data);
    return response;
  }
}
