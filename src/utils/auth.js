export const saveToken = (token) => {
  localStorage.setItem("csrToken", token);
};

export const getToken = () => {
  return localStorage.getItem("csrToken");
};

export const logoutUser = () => {
  localStorage.removeItem("csrToken");
};
