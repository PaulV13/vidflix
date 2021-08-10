const initialState = {
  user: null,
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
    default:
      return state;
  }
};

export default reducer;
