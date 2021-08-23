export interface IUser {
  name: String;
  role: String;
}

const initalState = {
  name: "",
  role: "",
};

type Action = {
  type: "ADD";
  payload: IUser;
};

export const userReducer = (state: IUser = initalState, action: Action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
