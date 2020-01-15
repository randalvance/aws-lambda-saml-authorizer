import React from 'react';
import qs from 'querystring';

export const AuthPage = () => {
    const query = qs.parse(window.location.search.slice(1));
    return (
        <>
            <h1>Auth Page</h1>
            <p>{query.token}</p>
        </>
    )
};