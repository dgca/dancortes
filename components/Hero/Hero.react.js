import React from "react";
import styled from "styled-components";

import FAIcon from "../FAIcon/FAIcon.react";

const Wrapper = styled.section`
  background-image: url("/images/hero.png");
  background-position: left 50%;
  background-size: 100% auto;
  position: sticky;
  top: 0;

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
    font-size: 24px;
    left: 0;
    padding: 60px;
    position: absolute;
    right: 0;
    top: 0;
  }

  h1 {
    font-size: 60px;
  }

  .hide {
    display: inline-block;
    height: 0;
    overflow: hidden;
    width: 0;
  }
`;

const Hero = () => {
  return (
    <Wrapper>
      <div className="content">
        <h1>Dan Cortes</h1>
        <p>
          Web Developer <span className="hide">located in</span>
          <br />
          <FAIcon icon="map-marker-alt" /> Chicago, IL
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;
