import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
