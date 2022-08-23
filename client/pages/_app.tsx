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
      <div className="antialiased">
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default MyApp;
