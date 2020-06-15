import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./quotebox.module.scss";

const QuoteBox = ({ as: Wrapper = "blockquote", children, quotes = true }) => (
  <Wrapper className={styles.wrapper}>
    <div className={styles.borderWrapper}>
      {quotes && (
        <span className={classnames(styles.quote, styles.quotePre)}>“</span>
      )}
      {children}
      {quotes && (
        <span className={classnames(styles.quote, styles.quotePost)}>”</span>
      )}
    </div>
  </Wrapper>
);

QuoteBox.propTypes = {
  as: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  quotes: PropTypes.bool,
};

export default QuoteBox;
