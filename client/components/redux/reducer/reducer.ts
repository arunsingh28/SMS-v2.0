export interface IUser {
  name: String;
}

const initalState = {
  name: "",
};

type Action = {
  type: "ADD";
  payload: String;
};

export const userReducer = (state: IUser = initalState, action: Action) => {
  console.log(action.payload);
  switch (action.type) {
    case "ADD":
      return action.payload;
    default:
      console.log(state);
      return state;
  }
};
