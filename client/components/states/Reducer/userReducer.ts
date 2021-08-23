import { Action } from "../actions/index.action";
import { ActionType } from "../action-type/index";

const intialState = 0;

const reducer = (state: number = intialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return state + action.payload;
    case ActionType.LOGOUT:
      return 0;
    default:
      return state;
  }
};

export default reducer;
