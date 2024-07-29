import axios from 'axios';

export default class UserService {
  static async user(role, userData) {
    const response = await axios.post(`/users/${role}`, userData);
    return response;
  }

  static async verifyUser(token) {
    const response = await axios.post('/users/verify', { token });
    return response;
  }

  static async resetPassword(data) {
    const response = await axios.post('/users/update', data);
    return response;
  }

  static async googleLogin(access_token) {
    const response = await axios.post('/users/google-login', {
      access_token,
    });
    return response;
  }
}
