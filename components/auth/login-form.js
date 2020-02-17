import React from 'react';
import { observer } from 'mobx-react';
import Input from '../input';
import Button from '../button';

import authStore from '../../stores/auth.store';

import './login-form.less';

const LoginForm = observer(() => (
  <div>
    <h3 className="LoginForm-title">Login</h3>

    <Input label="Email" placeholder="Email" value={authStore.email}
      onChange={(value => { authStore.email = value; })} />
    <Input label="Password" placeholder="Password" value={authStore.password} type="password"
      onChange={(value => { authStore.password = value; })} />

    <Button label="Login" onClick={() => authStore.login()} />

    <div className="LoginForm-register">Don't have an account?&nbsp;
      <a href="#" onClick={() => { authStore.isNewUser = true; }}>Create</a>
    </div>

    {authStore.loginFailedError && <div className="LoginForm-errorMessage">{authStore.loginFailedError}</div>}
  </div>
));

export default LoginForm;