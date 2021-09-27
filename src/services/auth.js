export const user_data = "Token";
export const isAuthenticated = () => localStorage.getItem("Token") !== null ;

export const getToken = () => localStorage.getItem(user_data);
export const login = token => {
  localStorage.setItem(user_data, token);
  console.log('teste de login' ,getToken)
};
export const logout = () => {
  localStorage.removeItem(user_data);
};
