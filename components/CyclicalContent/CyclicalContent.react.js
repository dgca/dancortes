import { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Item = styled.div`
  align-items: center;
  display: flex;
  opacity: 0;
  position: relative;
  transition: opacity 0.25s;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
    `}

  ${(props) =>
    !props.largestChild &&
    css`
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) translateY(-0.25em);
    `}
`;

function ItemWrapper({ children, active, largestChild }) {
  return (
    <Item active={active} largestChild={largestChild}>
      {children}
    </Item>
  );
}

export default function CyclicalContent({ items, intervalSpeed = 6000 }) {
  const intervalRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [largestChildIndex, setLargestChildIndex] = useState(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((curr) => {
        const next = curr + 1;
        return next >= items.length ? 0 : next;
      });
    }, intervalSpeed);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {
    const largestChild = [...wrapperRef.current.children].sort((a, b) => {
      return a.children[0].clientHeight > b.children[0].clientHeight ? 1 : 0;
    })[0];
    const largestIndex = [...wrapperRef.current.children].findIndex(
      (child) => child === largestChild
    );
    setLargestChildIndex(largestIndex);
  }, []);
  return (
    <div ref={wrapperRef}>
      {items.map((item, i) => (
        <ItemWrapper
          key={i}
          active={activeIndex === i}
          largestChild={largestChildIndex === i}
        >
          {item}
        </ItemWrapper>
      ))}
    </div>
  );
}
