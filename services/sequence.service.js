import axios from 'axios';
import sessionstorage from 'sessionstorage';

import configService from './config.service';

class AuthService {
  constructor() {
    const config = configService.getConfig();
    this.tkfServiceUrl = config.services.tkfService;
  }

  async getCurrentSequence() {
    const token = sessionstorage.getItem('tkfAuth');
    const getCurrentSequenceRequest =
      await axios.get(`${this.tkfServiceUrl}/sequence/current`, {
        headers: { Authorization: `Bearer ${token}` }
      });

    return getCurrentSequenceRequest.data;
  }

  async getNextSequence() {
    const token = sessionstorage.getItem('tkfAuth');
    const getNextSequenceRequest =
      await axios.get(`${this.tkfServiceUrl}/sequence/next`, {
        headers: { Authorization: `Bearer ${token}` }
      });

    return getNextSequenceRequest.data;
  }

  async updateCurrentSequence(sequence) {
    const token = sessionstorage.getItem('tkfAuth');
    const updateCurrentSequenceRequest =
      await axios.put(`${this.tkfServiceUrl}/sequence/current`, {
        current: sequence
      }, { headers: { Authorization: `Bearer ${token}` } });

    return updateCurrentSequenceRequest.data;
  }
}

export default new AuthService();