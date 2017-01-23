export const clearSession = () =>
  sessionStorage.removeItem('jwt');

export const isAuthenticated = () =>
  (sessionStorage.getItem('jwt') !== null);

export const markSessionAsAuthenticated = jwt =>
  sessionStorage.setItem('jwt', jwt);
