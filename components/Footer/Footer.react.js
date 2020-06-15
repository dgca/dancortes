import styled from "styled-components";
import FAIcon from "../FAIcon/FAIcon.react";

const Wrapper = styled.footer`
  align-items: center;
  background-color: var(--black);
  color: white;
  display: flex;
  font-family: var(--font-heading);
  justify-content: space-between;
  padding: 60px;
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

const Footer = () => (
  <Wrapper>
    <p>Dan Cortes © 2020</p>
    <Links>
      <ul>
        <li>
          <FAIcon icon={["fab", "github"]} />
        </li>
        <li>
          <FAIcon icon={["fab", "linkedin"]} />
        </li>
        <li>
          <FAIcon icon={["fab", "codepen"]} />
        </li>
        <li>
          <FAIcon icon={["fab", "twitter"]} />
        </li>
      </ul>
    </Links>
  </Wrapper>
);

export default Footer;
