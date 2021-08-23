import { Action } from "../actions/index.action";
import { ActionType } from "../action-type/index";

interface IUser {
  name: String;
  email: String;
  role: String;
  profile: String;
}

const intialState = {
  name: "",
  email: "",
  role: "",
  profile: "",
};

const reducer = (state: IUser = intialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return state;
    case ActionType.LOGOUT:
      return 0;
    default:
      return state;
  }
};

export default reducer;
