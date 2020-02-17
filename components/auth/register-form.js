import React from 'react';
import { observer } from 'mobx-react';

import Input from '../input';
import Button from '../button';

import authStore from '../../stores/auth.store';

import './register-form.less';

const RegisterForm = observer(() => (
  <div>
    <h3 className="RegisterForm-title">Register</h3>

    <Input label="Name" placeholder="Name" value={authStore.newUserName}
      onChange={(value => { authStore.newUserName = value; })} />
    <Input label="Email" placeholder="Email" value={authStore.newUserEmail}
      onChange={(value => { authStore.newUserEmail = value; })} />
    <Input label="Password" placeholder="Password" value={authStore.newUserPassword} type="password"
      onChange={(value => { authStore.newUserPassword = value; })} />

    <Button label="Create User" onClick={() => authStore.registerUser()} />

    {authStore.registerFailedError && <div className="RegisterForm-errorMessage">{authStore.registerFailedError}</div>}
  </div>
));

export default RegisterForm;