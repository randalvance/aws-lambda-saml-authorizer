import React, { useMemo, useEffect, useState, useCallback } from 'react';
import * as auth from './Auth';

export const HomePage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
    const token = useMemo(() => isAuthenticated && auth.getToken(), [isAuthenticated]);

    const handleLoginButtonClick = useCallback(() => auth.login(), []);
    const handleLogoutButtonClick = useCallback(() => {
        auth.logout();
        setIsAuthenticated(false);
    }, [setIsAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated || !token) return;
        setIsLoading(true);
        fetch('https://3sbxvlgvq4.execute-api.ap-southeast-1.amazonaws.com/dev/resource',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            setUserInfo(json);
            setIsLoading(false);
        }).catch(() => {
            setIsError(true);
        });
    }, [isAuthenticated, token, setUserInfo, setIsLoading]);

    return (
        <>
            <h1>AWS Lambda SAML Authentication</h1>
            {!isError && auth.isAuthenticated() ? (
                <>
                    <h1>{isLoading ? 'Loading User Data...' : 'You are logged in!'}</h1>
                    {!isLoading && (
                        <>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <td>{userInfo.displayName}</td>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <td>{userInfo.userName}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{userInfo.email}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{userInfo.role}</td>
                                </tr>
                            </table>
                            <button className="btn-login" onClick={handleLogoutButtonClick}>Logout</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    {isError && <p style={{color: 'red'}}>An error occured! Please try again.</p>}  
                    <button className="btn-login" onClick={handleLoginButtonClick}>Login</button>
                </>
            )}
        </>
    );
}