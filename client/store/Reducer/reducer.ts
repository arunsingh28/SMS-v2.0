import { ActionType } from "../Actions";

export interface IUser {
  name: String;
  role: String;
  show: Boolean;
}

type Action = {
  type: String;
  payload: IUser;
};

const initalState = {
  name: "",
  role: "",
  show: false,
};

export const userReducer = (state: IUser = initalState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD:
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
      };
    case ActionType.SHOW:
      return {
        ...state,
        show: action.payload.show,
      };
    default:
      return state;
  }
};
