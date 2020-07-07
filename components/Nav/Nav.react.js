import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import styled, { css } from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--black);
  color: white;
  display: flex;
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 800;
  justify-content: space-between;
  padding: 0 60px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HomepageLink = styled.a`
  align-items: center;
  color: white;
  display: flex;
  padding: 15px 0;
  text-decoration: none;
`;

const Logo = styled.img`
  display: block;
  height: 40px;
  margin-right: 15px;
  width: 40px;
`;

const LinksList = styled.ul`
  display: flex;
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

const Nav = () => (
  <Wrapper>
    <h1>
      <Link href="/" passHref>
        <HomepageLink>
          <Logo src="/images/logo.png" alt="" />
          Dan Cortes
        </HomepageLink>
      </Link>
    </h1>
    <nav>
      <LinksList>
        {links.map(({ name, path }, i) => (
          <LinkItem name={name} path={path} key={i} />
        ))}
      </LinksList>
    </nav>
  </Wrapper>
);

Nav.propTypes = {
  siteTitle: PropTypes.string,
};

Nav.defaultProps = {
  siteTitle: ``,
};

export default Nav;
