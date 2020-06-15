import styled from "styled-components";

export const Container = styled.section`
  padding: 60px 60px 80px;
  margin: 0 auto;
  max-width: 80rem;
`;
export const Heading = styled.h1`
  font-size: 32px;
  text-align: center;
  line-height: 1.4;
  margin: 0 auto 60px;
  margin-bottom: 1.5em;
  max-width: 30ch;
  text-transform: capitalize;
`;
export const Paragraph = styled.p`
  font-size: 20px;

  &:not(:last-child) {
    margin-bottom: 25px;
  }
`;
