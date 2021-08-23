import { createStore } from "redux";
import { userReducer } from "./reducer/reducer";

export const store = createStore(userReducer);
