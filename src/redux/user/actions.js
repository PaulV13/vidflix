const LOGIN_ACTION = "login";
const LOGOUT_ACTION = "logout";

const login = (user) => {
  return {
    type: LOGIN_ACTION,
    payload: user,
  };
};

const logout = () => {
  return {
    type: LOGOUT_ACTION,
    payload: null,
  };
};

export { login, logout };
