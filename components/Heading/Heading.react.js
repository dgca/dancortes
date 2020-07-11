import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { atAndBelow, bp } from "../../styles/breakpoints";

const Heading = styled.h1`
  font-size: 3.2rem;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 1.5em;
  max-width: 30ch;

  ${({ align }) => {
    if (align === "center") {
      return css`
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      `;
    }
  }}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  ${atAndBelow(
    bp.s,
    (css) => css`
      font-size: 2.4rem;
    `
  )}
`;

Heading.propTypes = {
  align: PropTypes.oneOf(["left", "center"]),
};

Heading.defaultProps = {
  align: "center",
};

export default Heading;
