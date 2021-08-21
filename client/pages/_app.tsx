import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-grey-800 antialiased">
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
