export const getToken = () => {
  return localStorage.getItem("token");
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now(); // check expiry
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
}