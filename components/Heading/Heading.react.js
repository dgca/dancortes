import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Heading = styled.h1`
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

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`;

Heading.propTypes = {
  align: PropTypes.oneOf(["left", "center"]),
};

Heading.defaultProps = {
  align: "center",
};

export default Heading;
