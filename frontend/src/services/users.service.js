import axios from 'axios';

export default class UserService {
  static async user(role, userData) {
    const response = await axios.post(`/api/user/${role}`, userData);
    return response;
  }

  static async getData(token) {
    const response = await axios.get('/api/user', {
      headers: { token },
    });
    return response;
  }

  static async verifyUser(token) {
    const response = await axios.post('/api/user/verify', { token });
    return response;
  }

  static async resetPassword(data) {
    const response = await axios.post('/api/user/update', data);
    return response;
  }

  static async userDataUpdate(data) {
    const response = await axios.post('/api/user', data);
    return response;
  }

  static async googleLogin(access_token) {
    const response = await axios.post('/api/user/google-login', {
      access_token,
    });
    return response;
  }
}
