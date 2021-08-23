import { ActionType } from "../Actions";

export interface IUser {
  name: String;
  role: String;
}

type Action = {
  type: String;
  payload: IUser;
};

const initalState = {
  name: "",
  role: "",
};

export const userReducer = (state: IUser = initalState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD:
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
