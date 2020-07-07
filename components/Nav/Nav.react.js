import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import classnames from "classnames";

import styled from "styled-components";

import styles from "./nav.module.scss";

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
  cursor: pointer;
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
  cursor: pointer;
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
        <Link href={path}>
          <LinkAnchor
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {name.split("").map((char, i) => (
              <span
                key={i}
                className={classnames({
                  [styles.activeChar]: this.state.activeIndex === i,
                })}
              >
                {char}
              </span>
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
      <Link href="/">
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
