import { observable } from 'mobx';
import sha256 from 'sha256';

import authService from '../services/auth.service';
import navigationService from '../services/navigation.service';

class AuthStore {
  @observable newUserPassword = '';
  @observable newUserName = '';
  @observable newUserEmail = '';
  @observable registerFailedError = '';

  @observable loginFailedError = '';
  @observable password = '';
  @observable email = '';

  @observable user = null;

  @observable isNewUser = false;

  async registerUser() {
    this.registerFailedError = '';

    try {
      const registerReponseData =
        await authService.registerUser(this.newUserName, this.newUserEmail, sha256.x2(this.newUserPassword));

      if (registerReponseData) {
        navigationService.navigateToSequencePage();
      }
    } catch (e) {
      this.registerFailedError = `User already exists. Please try to log in. 
        In case you forgot your password, please write us an email at support@tkf.com.`;
    }
  }

  async login() {
    this.loginFailedError = '';

    try {
      const loginResponseData = await authService.login(this.email, sha256.x2(this.password));
      if (loginResponseData) {
        this.user = loginResponseData;
        navigationService.navigateToSequencePage();
      }
    } catch (e) {
      this.loginFailedError = 'Email or password are incorrect.';
    }
  }

  async verifyUsersToken() {
    const userHasValidToken = await authService.verifyUsersToken();
    if (!userHasValidToken) {
      navigationService.navigateToLoginPage();
      return;
    }

    this.user = userHasValidToken.user;
  }
}

export default new AuthStore();