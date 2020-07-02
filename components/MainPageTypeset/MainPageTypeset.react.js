import PropTypes from "prop-types";
import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 60px 60px 80px;
  margin: 0 auto;
  max-width: 80rem;
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

export const Paragraph = styled.p`
  &:not(:last-child) {
    margin-bottom: 25px;
  }
`;
