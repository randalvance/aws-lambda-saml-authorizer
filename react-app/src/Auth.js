import config from './config';

export const login = () => {
    if (!config.loginUrl) {
        alert('Login URL was not configured!');
    }
    const returnUrl = `${window.location.origin}/auth`;
    // Redirect to LOGIN URL
    window.location.href = `${config.loginUrl}?returnUrl=${returnUrl}`;
};

export const setToken = (token) => {
    window.sessionStorage.setItem('jwt', token);
}
export const getToken = () => {
    return window.sessionStorage.getItem('jwt');
}
export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
}