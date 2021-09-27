const Auth = {
  signIn(cb: () => void) {
    setTimeout(cb, 100);
  },
  signOut(cb: () => void) {
    setTimeout(cb, 100);
  },
};

export default Auth;
