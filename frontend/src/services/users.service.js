import axios from 'axios';

export default class userService {
  static async user(role, userData) {
    const response = await axios.post(`/api/user/${role}`, userData);
    return response;
  }

  static async sendVerificationEmail(user) {
    const response = await axios.post('/api/user/verification', { user });
    return response;
  }

  static async verifyUser(token) {
    const response = await axios.get(`/api/user/verify-email/${token}`);
    return response;
  }
  static async forgotPassword(email) {
    const response = await axios.get(`/api/user/forgot-password/${email}`);
    return response;
  }

  static async resetPassword(data) {
    const response = await axios.post('/api/user/resetPassword', data);
    return response;
  }

  static async googleLogin(access_token) {
    const response = await axios.post('/api/user/google-login', {
      access_token,
    });
    return response;
  }
}
