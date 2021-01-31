export const isLoggedin = () => {
  return localStorage.getItem('accessToken') &&
    localStorage.getItem('refreshToken')
    ? true
    : false;
};
