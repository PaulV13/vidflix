const initialState = {
  user: null,
  movie: null,
  position: null,
  show: false,
  showPoster: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        user: null,
      };
    case "movieAction":
      return {
        ...state,
        movie: action.payload,
      };
    case "positionAction":
      return {
        ...state,
        position: action.payload,
      };
    case "showAction":
      return {
        ...state,
        show: action.payload,
      };
    case "showPosterAction":
      return {
        ...state,
        showPoster: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
