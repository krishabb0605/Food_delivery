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
}
