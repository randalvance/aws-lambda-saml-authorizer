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