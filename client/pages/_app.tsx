import "../styles/globals.css";
import type { AppProps } from "next/app";
import "material-icons/iconfont/material-icons.css";
import { Provider } from "react-redux";
import { store } from "../components/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="antialiased">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default MyApp;
