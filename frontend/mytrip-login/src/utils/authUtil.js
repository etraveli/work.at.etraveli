export const clearSession = () => sessionStorage.removeItem('jwt');

export const isAuthenticated = () => sessionStorage.getItem('jwt') !== null;

export const markSessionAsAuthenticated = jwt =>
  sessionStorage.setItem('jwt', jwt);

export const persistJWT = data => {
  if (data.jwt !== null) {
    markSessionAsAuthenticated(data.jwt);
  }
  return data;
};
