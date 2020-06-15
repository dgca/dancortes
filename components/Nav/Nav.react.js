import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./nav.module.scss";

const Logo = () => (
  <img
    className={styles.logo}
    height="40"
    width="40"
    src="/images/logo.png"
    alt=""
  />
);

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
          <a
            className={classnames(styles.link, {
              [styles.linkActive]: this.state.hasHover,
            })}
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
          </a>
        </Link>
      </li>
    );
  }
}

const Nav = () => (
  <nav className={styles.wrapper}>
    <h1>
      <Link href="/">
        <a className={styles.titleLink}>
          <Logo className={styles.logo} />
          Dan Cortes
        </a>
      </Link>
    </h1>
    <nav>
      <ul className={styles.linksList}>
        {links.map(({ name, path }, i) => (
          <LinkItem name={name} path={path} key={i} />
        ))}
      </ul>
    </nav>
  </nav>
);

Nav.propTypes = {
  siteTitle: PropTypes.string,
};

Nav.defaultProps = {
  siteTitle: ``,
};

export default Nav;
