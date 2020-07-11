import PropTypes from "prop-types";
import styled from "styled-components";
import { bp, atAndBelow } from "../../styles/breakpoints";

const Wrapper = styled.div`
  background-color: var(--yellow);
  font-family: var(--font-heading);
  padding: 6rem;

  ${atAndBelow(
    bp.s,
    (css) => css`
      padding: 4rem 3rem;
    `
  )}
`;

const Heading = styled.div`
  color: var(--blue);
  text-shadow: -0.1em 0.1em 0 var(--pink);
  font-size: 32px;
  margin-bottom: 30px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${atAndBelow(
    bp.s,
    (css) => css`
      flex-direction: column;
    `
  )}
`;

const borderSize = "5px";

const Items = styled.ul`
  background-color: white;
  border: ${borderSize} solid var(--blue);
  box-shadow: -${borderSize} ${borderSize} 0 var(--pink),
    -${borderSize} ${borderSize} 0 var(--pink) inset;
  font-size: 20px;
  list-style: disc inside;
  padding: 30px;
  width: calc(50% - 10px);

  ${atAndBelow(
    bp.s,
    (css) => css`
      margin-bottom: 3rem;
      width: 100%;
    `
  )}
`;

const Item = styled.li`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ItemsMapper = ({ items }) => (
  <Items>
    {items.map((item, i) => (
      <Item key={i}>{item}</Item>
    ))}
  </Items>
);

const SkillsList = ({ as = "section", heading, items }) => {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  return (
    <Wrapper as={as}>
      {heading && <Heading>{heading}</Heading>}
      <ItemsWrapper>
        <ItemsMapper items={left} />
        <ItemsMapper items={right} />
      </ItemsWrapper>
    </Wrapper>
  );
};

SkillsList.propTypes = {
  heading: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.node),
};

export default SkillsList;
