import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { atAndBelow, bp } from "../../styles/breakpoints";

export const Container = styled.section`
  padding: 6rem 6rem 8rem;
  margin: 0 auto;
  max-width: 80rem;

  ${atAndBelow(
    bp.s,
    (css) => css`
      padding: 3rem 3rem 4rem;
    `
  )}
`;

export const Heading = styled.h1`
  font-size: 32px;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 1.5em;
  max-width: 30ch;
  text-transform: capitalize;

  ${({ align }) => {
    if (align === "center") {
      return css`
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      `;
    }
  }}
`;

Heading.propTypes = {
  align: PropTypes.oneOf(["left", "center"]),
};

Heading.defaultProps = {
  align: "center",
};
