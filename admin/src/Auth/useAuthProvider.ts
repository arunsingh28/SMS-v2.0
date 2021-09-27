import { useState } from "react";
import Auth from "./Auth";

const useAuthProvider = () => {
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
