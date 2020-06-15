import PropTypes from "prop-types";
import styles from "./skillslist.module.scss";

const Items = ({ items }) => (
  <ul className={styles.items}>
    {items.map((item, i) => (
      <li className={styles.item} key={i}>
        {item}
      </li>
    ))}
  </ul>
);

const SkillsList = ({ as: Wrapper = "section", heading, items }) => {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  return (
    <Wrapper className={styles.wrapper}>
      {heading && <h1 className={styles.heading}>{heading}</h1>}
      <div className={styles.itemsWrapper}>
        <Items items={left} />
        <Items items={right} />
      </div>
    </Wrapper>
  );
};

SkillsList.propTypes = {
  heading: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.node),
};

export default SkillsList;
