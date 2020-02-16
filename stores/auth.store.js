import { observable } from 'mobx';
import sha256 from 'sha256';

import authService from '../services/auth.service';
import navigationService from '../services/navigation.service';

class AuthStore {
  @observable newUserPassword = '';
  @observable newUserName = '';
  @observable newUserEmail = '';

  @observable password = '';
  @observable email = '';

  @observable user = null;

  @observable isNewUser = false;

  async registerUser() {
    const registerReponseData =
      await authService.registerUser(this.newUserName, this.newUserEmail, sha256.x2(this.newUserPassword));

    if (registerReponseData) {
      navigationService.navigateToSequencePage();
    }
  }

  async login() {
    const loginResponseData = await authService.login(this.email, sha256.x2(this.password));

    if (loginResponseData) {
      navigationService.navigateToSequencePage();
    }
  }

  async verifyUsersToken() {
    const userHasValidToken = await authService.verifyUsersToken();
    if (!userHasValidToken) {
      navigationService.navigateToLoginPage();
    }
  }
}

export default new AuthStore();