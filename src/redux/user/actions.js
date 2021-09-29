const LOGIN_ACTION = "login";
const LOGOUT_ACTION = "logout";
const MOVIE_ACTION = "movieAction";
const POSITION_ACTION = "positionAction";
const SHOW_ACTION = "showAction";
const SHOWPOSTER_ACTION = "showPosterAction";

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

const movieAction = (movie) => {
  return {
    type: MOVIE_ACTION,
    payload: movie,
  };
};

const positionAction = (position) => {
  return {
    type: POSITION_ACTION,
    payload: position,
  };
};

const showAction = (show) => {
  return {
    type: SHOW_ACTION,
    payload: show,
  };
};

const showPosterAction = (showPoster) => {
  return {
    type: SHOWPOSTER_ACTION,
    payload: showPoster,
  };
};

export {
  login,
  logout,
  movieAction,
  positionAction,
  showAction,
  showPosterAction,
};
