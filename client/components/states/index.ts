import { combineReducers } from "redux";
import userReducer from "./Reducer/userReducer";

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
