import "../styles/globals.css";
import type { AppProps } from "next/app";
import "material-icons/iconfont/material-icons.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
