import React, { useCallback } from 'react';
import config from './config';
import { isAuthenticated } from './Auth';

export const HomePage = () => {

  const handleLoginButtonClick = useCallback(() => {
    if (!config.loginUrl) {
      alert('Login URL was not configured!');
    }
    const returnUrl = `${window.location.origin}/auth`;
    // Redirect to LOGIN URL
    window.location.href = `${config.loginUrl}?returnUrl=${returnUrl}`;
  }, []);

  return (
    <>
        <h1>AWS SAML Integration</h1>
        {isAuthenticated() ? (
            <h1>Welcome</h1>
        ) : ( 
            <button className="btn-login" onClick={handleLoginButtonClick}>Login</button>
        )}
    </>
  );
}