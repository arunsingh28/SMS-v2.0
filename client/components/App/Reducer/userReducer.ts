const intialState = 0;

interface LoginAction {
  type: "login";
  payload: number;
}
interface Logout {
  type: "logout";
}
type Action = LoginAction | Logout;

const reducer = (state: number = intialState, action: Action) => {
  switch (action.type) {
    case "login":
      return state + action.payload;
    case "logout":
      return 0;
    default:
      return state;
  }
};

export default reducer;
