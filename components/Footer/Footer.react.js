import styled from "styled-components";
import FAIcon from "../FAIcon/FAIcon.react";
import { atAndBelow, bp } from "../../styles/breakpoints";

import { social } from "../../lib/constants";

const Wrapper = styled.footer`
  align-items: center;
  background-color: var(--black);
  color: white;
  display: flex;
  font-family: var(--font-heading);
  justify-content: space-between;
  padding: 6rem;

  ${atAndBelow(
    bp.s,
    (css) => css`
      flex-direction: column;
      padding: 4rem 0;

      p {
        margin-bottom: 1rem;
      }
    `
  )}
`;

const Links = styled.nav`
  ul {
    display: flex;
  }

  li {
    margin-left: 10px;
    padding: 10px;
  }
`;

const FAIconAnchorWrapper = styled.a`
  color: inherit;
`;

FAIconAnchorWrapper.defaultProps = {
  target: "_blank",
  rel: "noopener",
};

const Footer = () => (
  <Wrapper>
    <p>Dan Cortes © {new Date().getFullYear()}</p>
    <Links>
      <ul>
        <li>
          <FAIconAnchorWrapper href={social.github.url}>
            <FAIcon icon={["fab", "github"]} />
          </FAIconAnchorWrapper>
        </li>
        <li>
          <FAIconAnchorWrapper href={social.linkedIn.url}>
            <FAIcon icon={["fab", "linkedin"]} />
          </FAIconAnchorWrapper>
        </li>
        <li>
          <FAIconAnchorWrapper href={social.codePen.url}>
            <FAIcon icon={["fab", "codepen"]} />
          </FAIconAnchorWrapper>
        </li>
        <li>
          <FAIconAnchorWrapper href={social.twitter.url}>
            <FAIcon icon={["fab", "twitter"]} />
          </FAIconAnchorWrapper>
        </li>
      </ul>
    </Links>
  </Wrapper>
);

export default Footer;
