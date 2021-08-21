import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased">
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
