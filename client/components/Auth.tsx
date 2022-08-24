import { useState } from "react";

const Auth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("token");
  if (token) {
    setIsAuth(true);
  }
  return;
};

export default Auth;
