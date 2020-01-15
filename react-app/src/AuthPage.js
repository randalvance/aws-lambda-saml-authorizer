import React, { useMemo, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';
import { setToken } from './Auth';

export const AuthPage = () => {
    const token = useMemo(() => decodeURIComponent(qs.parse(window.location.search.slice(1)).token), []);
    useEffect(() => {
        setToken(token);
    }, [token]);
    return (
        <>
            <h1>Auth Page</h1>
            {token && <Redirect to="/" />}
        </>
    )
};