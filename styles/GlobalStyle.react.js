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

  p {
    line-height: 1.8;
  }
`;

export default GlobalStyle;
