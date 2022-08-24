import "../styles/globals.css";
import type { AppProps } from "next/app";
import "material-icons/iconfont/material-icons.css";
import { Provider } from "react-redux";
import { store } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="antialiased app-wrapper">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default MyApp;
