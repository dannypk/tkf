import axios from 'axios';
import sessionstorage from 'sessionstorage';

import configService from './config.service';

class AuthService {
  constructor() {
    const config = configService.getConfig();
    this.tkfServiceUrl = config.services.tkfService;
  }

  async login(email, password) {
    const loginRequest =
      await axios.post(`${this.tkfServiceUrl}/user/login`, {
        email, password
      });

    if (loginRequest.status === 200 && loginRequest.data) {
      sessionstorage.setItem('tkfAuth', loginRequest.data.token);
    }

    return loginRequest.data;
  }

  async verifyUsersToken() {
    const token = sessionstorage.getItem('tkfAuth');
    if (token) {
      const verifyResponse =
        await axios.get(`${this.tkfServiceUrl}/user/verify`, { headers: { Authorization: `Bearer ${token}` } });

      return verifyResponse && verifyResponse.data;
    }

    return undefined;
  }

  async registerUser(name, email, password) {
    const registerUserRequest =
      await axios.put(`${this.tkfServiceUrl}/user/register`, {
        name, email, password
      });

    if (registerUserRequest.status === 201 && registerUserRequest.data) {
      sessionstorage.setItem('tkfAuth', registerUserRequest.data.token);
    }

    return registerUserRequest.data;
  }
}

export default new AuthService();