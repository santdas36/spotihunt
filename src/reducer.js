export const initialState = {
  questions: null,
  user: null,
  leaderboard: null,
  time: 0,
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
	case "SET_LEADERBOARD":
      return {
        ...state,
        leaderboard: action.leaderboard,
      };
	case "SET_TIME":
      return {
        ...state,
        time: action.time,
      };

    default:
      return state;
  }
};

export default reducer;
