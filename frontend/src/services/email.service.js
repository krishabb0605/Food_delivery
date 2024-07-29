import axios from 'axios';

export default class EmailService {
  static async sendVerificationEmail(user) {
    const response = await axios.post('/email/verification', { user });
    return response;
  }

  static async forgotPassword(email) {
    const response = await axios.post('/email/forgot-password/', { email });
    return response;
  }
}
