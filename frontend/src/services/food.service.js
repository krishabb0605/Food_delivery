import axios from 'axios';

export default class FoodService {
  static async addFood(foodData) {
    const response = await axios.post('/foodItems', foodData);
    return response;
  }

  static async listFood() {
    const response = await axios.get('/foodItems');
    return response;
  }

  static async removeFood(id) {
    const response = await axios.delete(`/foodItems/${id}`);
    return response;
  }

  static async updateFood(id, data) {
    const response = await axios.post(`/foodItems/${id}`, data);
    return response;
  }
}
