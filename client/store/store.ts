import { createStore } from "redux";
import { userReducer } from "./Reducer/reducer";

export const store = createStore(userReducer);
