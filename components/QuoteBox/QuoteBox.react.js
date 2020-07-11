import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { atAndBelow, bp } from "../../styles/breakpoints";

const borderOffset = "5px";

const Wrapper = styled.blockquote`
  background-color: var(--pink);
  color: var(--blue);
  font-family: var(--font-heading);
  font-size: 1.4em;
  padding: 6rem;
  text-align: center;
  text-shadow: -${borderOffset} ${borderOffset} 0 var(--yellow);

  * {
    line-height: inherit;
  }

  .border-wrapper {
    border: ${borderOffset} solid var(--blue);
    box-shadow: -${borderOffset} ${borderOffset} 0 0 var(--yellow),
      -${borderOffset} ${borderOffset} 0 0 var(--yellow) inset;
    padding: 6rem;
  }

  .quote {
    font-size: 2em;
    position: absolute;
    top: 10px;
  }

  .quote-pre {
    left: 20px;
  }

  .quote-post {
    right: 20px;
  }

  ${atAndBelow(
    bp.s,
    (css) => css`
      font-size: 1em;
      padding: 3rem;

      .border-wrapper {
        padding: 4rem 2rem;
      }
    `
  )}
`;

const QuoteBox = ({ children, quotes = true }) => (
  <Wrapper>
    <div className="border-wrapper">
      {quotes && <span className="quote quote-pre">“</span>}
      {children}
      {quotes && <span className="quote quote-post">”</span>}
    </div>
  </Wrapper>
);

QuoteBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  quotes: PropTypes.bool,
};

export default QuoteBox;
