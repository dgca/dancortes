import { useEffect } from "react";
import App from "next/app";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import { pageview } from "../lib/gtag";

// Set up FontAwesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Styling
import GlobalStyle from "../styles/GlobalStyle.react";
import "../styles/reset.css";

config.autoAddCss = false;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
