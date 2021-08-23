import "../styles/globals.css";
import type { AppProps } from "next/app";
import "material-icons/iconfont/material-icons.css";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
export default MyApp;
