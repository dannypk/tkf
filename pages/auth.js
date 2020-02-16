import React from 'react';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';

import RegisterForm from '../components/auth/register-form';
import LoginForm from '../components/auth/login-form';

import authStore from '../stores/auth.store';

import './auth.less';

const ParticlesBg = dynamic(() => import('particles-bg'), { ssr: false });

@observer
class AuthPage extends React.Component {
  render() {
    const { isNewUser } = authStore;

    return (
      <div className="AuthPage" >
        <div className="AuthPage-loginForm">
          <div>
            {isNewUser && <RegisterForm />}
            {!isNewUser && <LoginForm />}
          </div>
        </div>
        <ParticlesBg num={10} type="circle" bg />
      </div>
    );
  }
}

export default AuthPage;