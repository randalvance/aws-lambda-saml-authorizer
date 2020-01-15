import React, { useCallback } from 'react';

import config from './config';

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
        <button className="btn-login" onClick={handleLoginButtonClick}>Login</button>
    </>
  );
}