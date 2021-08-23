import { createStore } from "redux";
import { reducer } from "./Reducer/userReducer";

export const store = createStore(reducer);
