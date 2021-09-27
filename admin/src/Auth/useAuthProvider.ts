import { useState } from "react";
import Auth from "./Auth";

export interface IUseAuthProvider {
  signIn: (cb: () => void) => void;
  singOut: (cb: () => void) => void;
  user: string | null;
}

const useAuthProvider = (): IUseAuthProvider => {
  const [user, setUser] = useState<null | string>(null);

  const signIn = (cb: () => void) => {
    Auth.signIn(() => {
      setUser("Arun");
    });
  };
  const singOut = (cb: () => void) => {
    Auth.signOut(() => {
      setUser(null);
    });
  };
  return {
    user,
    singOut,
    signIn,
  };
};

export default useAuthProvider;
