import React from 'react';
import { login, isAuthenticated } from './Auth';

export const HomePage = () => {
  return (
    <>
        <h1>AWS SAML Integration</h1>
        {isAuthenticated() ? (
            <h1>Welcome</h1>
        ) : ( 
            <button className="btn-login" onClick={() => login()}>Login</button>
        )}
    </>
  );
}