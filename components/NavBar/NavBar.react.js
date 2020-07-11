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
  z-index: 2;

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
  display: none;
  font-size: 1em;
  outline: 0;
  padding: 0.15em 0.25em;

  ${atAndBelow(
    bp.s,
    (css) => css`
      display: block;
    `
  )}
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
        <ul
          onClick={(e) => {
            e.target.blur();
            setIsOpen(false);
          }}
        >
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

  constructor() {
    super();
    this.state = {
      hasHover: false,
      activeIndex: null,
    };
  }

  cycleLetters = () => {
    const { hasHover, activeIndex } = this.state;
    if (!hasHover) {
      return;
    }
    const current = activeIndex ?? 0;
    const nextIndex = {
      true: current + 1,
      [activeIndex === null]: 0,
      [current + 1 === this.props.name.length]: 0,
    }.true;
    this.setState({
      activeIndex: nextIndex,
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
      activeIndex: null,
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
