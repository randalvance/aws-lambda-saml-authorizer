import React, { useCallback } from 'react';

import config from './config';

import './App.css';

function App() {
  const handleLoginButtonClick = useCallback(() => {
    if (!config.loginUrl) {
      alert('Login URL was not configured!');
    }
    const returnUrl = `${window.location.origin}/auth`;
    // Redirect to LOGIN URL
    window.location.href = `${config.loginUrl}?returnUrl=${returnUrl}`;
  }, []);
  console.log(window.location);
  return (
    <div className="App">
      <h1>AWS SAML Integration</h1>
      <button className="btn-login" onClick={handleLoginButtonClick}>Login</button>
    </div>
  );
}

export default App;
