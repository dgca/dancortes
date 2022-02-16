import { createGlobalStyle } from "styled-components";
import vars from "./variables";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    position: relative;
  }

  :root {
    --gray: ${vars.gray};
    --yellow: ${vars.yellow};
    --blue: ${vars.blue};
    --red: ${vars.red};
    --pink: ${vars.pink};
    --purple: ${vars.purple};
    --black: ${vars.black};
    --white: ${vars.white};
    --font-heading: ${vars.fontHeading};
    --font-body: ${vars.fontBody};
    --font-code: ${vars.fontCode};
    font-size: 10px;
  }

  body {
    font-size: 2rem;
    line-height: 1.6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
    font-weight: 800;
  }

  body {
    color: var(--black);
    font-family: var(--font-body);
    position: relative;
  }

  code {
    font-family: var(--font-code);
  }

  .youtube-wrapper {
    width: 100%;
    aspect-ratio: 560 / 315;
    margin-bottom: 2em;
  }

  .youtube-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
