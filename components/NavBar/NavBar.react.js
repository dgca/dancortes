import React, { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import FaIcon from "../FAIcon/FAIcon.react";

import { bp, atAndBelow } from "../../styles/breakpoints";

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--black);
  color: white;
  display: flex;
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  justify-content: space-between;
  padding: 0 6rem;
  position: sticky;
  top: 0;
  /*
   * For some reason, there's a 1px gap above the nav...
   * @see: https://bugs.chromium.org/p/chromium/issues/detail?id=810352&q=sticky&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
   */
  transform: translateY(-1px);
  z-index: 1;

  ${atAndBelow(
    bp.s,
    (css) => css`
      padding: 0 1.2rem;
    `
  )}
`;

const HomepageLink = styled.a`
  align-items: center;
  color: white;
  display: flex;
  padding: 15px 0;
  text-decoration: none;

  ${atAndBelow(
    bp.s,
    (css) => css`
      .my-name {
        font-size: 0.8em;
      }
    `
  )}
`;

const Logo = styled.img`
  display: block;
  height: 40px;
  margin-right: 15px;
  width: 40px;
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border-radius: 0.25em;
  border: 1px solid var(--red);
  color: var(--red);
  font-size: 1em;
  outline: 0;
  padding: 0.15em 0.25em;
`;

const NavWrapper = styled.nav`
  ul {
    display: flex;
  }

  ${atAndBelow(
    bp.s,
    (css) => css`
      background-color: var(--black);
      display: none;
      padding-bottom: 1rem;
      position: absolute;
      right: 0;
      top: 100%;
      width: 100%;

      ul {
        flex-direction: column;
      }

      ${({ isOpen }) =>
        isOpen &&
        css`
          display: block;
        `}
    `
  )}
`;

const LinkAnchor = styled.a`
  color: var(--red);
  display: block;
  padding: 20px;
  text-decoration: none;

  &::before {
    background-color: currentColor;
    bottom: 10px;
    content: "";
    display: block;
    height: 5px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    transition: width 0.25s;
    width: 0;
  }

  &:hover {
    color: var(--white);
  }

  &:hover::before {
    width: 100%;
  }
`;

const LinkLetter = styled.span`
  ${({ active }) =>
    active &&
    css`
      color: var(--red);
    `}
`;

const links = [
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const LinksNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ToggleButton onClick={() => setIsOpen((currentState) => !currentState)}>
        <FaIcon icon={isOpen ? "times" : "bars"} fixedWidth />
      </ToggleButton>
      <NavWrapper isOpen={isOpen}>
        <ul>
          {links.map(({ name, path }, i) => (
            <LinkItem name={name} path={path} key={i} />
          ))}
        </ul>
      </NavWrapper>
    </>
  );
};

class LinkItem extends React.Component {
  static interval = 200;

  state = {
    hasHover: false,
    activeIndex: 0,
  };

  cycleLetters = () => {
    const { hasHover, activeIndex } = this.state;
    if (!hasHover) {
      return;
    }
    const newIndex =
      activeIndex + 1 === this.props.name.length ? 0 : activeIndex + 1;
    this.setState({
      activeIndex: newIndex,
    });
    setTimeout(this.cycleLetters, LinkItem.interval);
  };

  handleMouseEnter = () => {
    this.setState({
      hasHover: true,
    });
    setTimeout(this.cycleLetters, LinkItem.interval);
  };

  handleMouseLeave = () => {
    this.setState({
      hasHover: false,
      activeIndex: 0,
    });
  };

  render() {
    const { name, path } = this.props;
    return (
      <li>
        <Link href={path} passHref>
          <LinkAnchor
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {name.split("").map((char, i) => (
              <LinkLetter key={i} active={this.state.activeIndex === i}>
                {char}
              </LinkLetter>
            ))}
          </LinkAnchor>
        </Link>
      </li>
    );
  }
}

const NavBar = () => (
  <Wrapper>
    <h1>
      <Link href="/" passHref>
        <HomepageLink>
          <Logo src="/images/logo.png" alt="" />
          <span className="my-name">Dan Cortes</span>
        </HomepageLink>
      </Link>
    </h1>
    <LinksNav />
  </Wrapper>
);

NavBar.propTypes = {
  siteTitle: PropTypes.string,
};

NavBar.defaultProps = {
  siteTitle: ``,
};

export default NavBar;
