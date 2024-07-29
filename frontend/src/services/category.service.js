import axios from 'axios';

export default class CategoryService {
  static async addCategory(categoryData) {
    const response = await axios.post('/categories', categoryData);
    return response;
  }

  static async listCategory() {
    const response = await axios.get('/categories');
    return response;
  }
  static async removeCategory(id) {
    const response = await axios.delete(`/categories/${id}`);
    return response;
  }
  static async updateCategory(id, data) {
    const response = await axios.post(`/categories/${id}`, data);
    return response;
  }
}
