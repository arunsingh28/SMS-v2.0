import "../styles/globals.css";
import type { AppProps } from "next/app";
import "material-icons/iconfont/material-icons.css";
import { Provider } from "react-redux";
import { store } from "../components/states/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
export default MyApp;
