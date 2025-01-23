import axios from 'axios';

export default class FoodService {
  static async addFood(foodData) {
    const response = await axios.post('/api/foods', foodData);
    return response;
  }

  static async listFood() {
    const response = await axios.get('/api/foods');
    return response;
  }

  static async removeFood(id) {
    const response = await axios.delete(`/api/foods/${id}`);
    return response;
  }

  static async updateFood(id, data) {
    const response = await axios.post(`/api/foods/${id}`, data);
    return response;
  }
}
