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

export const reducer = (state: IUser = intialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return state;
    default:
      return state;
  }
};
