import App from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";

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

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
