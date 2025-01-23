import axios from 'axios';

export default class EmailService {
  static async sendVerificationEmail(user) {
    const response = await axios.post('/api/email/verification', { user });
    return response;
  }

  static async forgotPassword(email) {
    const response = await axios.post('/api/email/forgot-password/', { email });
    return response;
  }
}
