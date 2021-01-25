export const initialState = {
  questions: null,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };

    default:
      return state;
  }
};

export default reducer;
