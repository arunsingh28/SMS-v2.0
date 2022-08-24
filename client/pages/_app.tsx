import "../styles/globals.css";
import type { AppProps } from "next/app";
import "material-icons/iconfont/material-icons.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <div className="antialiased app-wrapper">
=======
      <div className="antialiased">
        <ToastContainer />
>>>>>>> 2bce89a5e7eaa551cc472e6e92559c0ce788a4df
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default MyApp;
