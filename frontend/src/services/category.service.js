import axios from 'axios';

export default class categoryService {
  static async addCategory(categoryData) {
    const response = await axios.post('/api/category/add', categoryData);
    return response;
  }

  static async listCategory() {
    const response = await axios.get('/api/category/list');
    return response;
  }
  static async removeCategory(id) {
    const response = await axios.post('/api/category/remove', { id });
    return response;
  }
  static async updateCategory(id, data) {
    const response = await axios.post(`/api/category/update/${id}`, data);
    return response;
  }
}
