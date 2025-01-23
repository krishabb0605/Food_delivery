import axios from 'axios';

export default class CategoryService {
  static async addCategory(categoryData) {
    const response = await axios.post('/api/categories', categoryData);
    return response;
  }

  static async listCategory() {
    const response = await axios.get('/api/categories');
    return response;
  }
  static async removeCategory(id) {
    const response = await axios.delete(`/api/categories/${id}`);
    return response;
  }
  static async updateCategory(id, data) {
    const response = await axios.post(`/api/categories/${id}`, data);
    return response;
  }
}
