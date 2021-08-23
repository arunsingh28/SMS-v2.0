import { ActionType } from "../action-type/index";

interface LoginAction {
  type: ActionType.LOGIN;
  payload: number;
}
interface Logout {
  type: ActionType.LOGOUT;
}
export type Action = LoginAction | Logout;
