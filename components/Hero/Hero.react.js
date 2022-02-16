import React from "react";
import styled from "styled-components";
import { bp, atAndBelow } from "../../styles/breakpoints";

import FAIcon from "../FAIcon/FAIcon.react";

const Wrapper = styled.section`
  background-image: url("/images/hero.jpg");
  background-position: left 50%;
  background-size: 100% auto;
  position: sticky;
  top: 0;
  transform: translate3d(0, 0, 0);

  &::before {
    background-image: linear-gradient(-15deg, var(--pink) 50%, var(--blue) 0);
    content: "";
    display: block;
    font-weight: 900;
    mix-blend-mode: multiply;
    padding-bottom: 45%;
  }

  .content {
    bottom: 0;
    color: white;
    font-family: var(--font-heading);
    left: 0;
    padding: 6rem;
    position: absolute;
    right: 0;
    top: 0;
  }

  h1 {
    font-size: 6rem;
  }

  p {
    font-size: 2.4rem;
  }

  .hide {
    display: inline-block;
    height: 0;
    overflow: hidden;
    width: 0;
  }

  ${atAndBelow(
    bp.s,
    (css) => css`
      h1 {
        font-size: 3rem;
        margin-bottom: 0.25em;
      }

      p {
        font-size: 2rem;
      }
    `
  )}

  ${atAndBelow(
    bp.xs,
    (css) => css`
      background-size: cover;

      &::before {
        background-image: linear-gradient(-15deg, var(--blue), var(--purple));
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }

      .content {
        padding: 3rem;
        position: relative;
      }
    `
  )}
`;

const Hero = () => {
  return (
    <Wrapper>
      <div className="content">
        <h1>Dan Cortes</h1>
        <p>
          Web Developer <span className="hide">located in</span>
          <br />
          <FAIcon icon="map-marker-alt" /> Denver, CO
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;
