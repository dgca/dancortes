import PropTypes from "prop-types";
import Head from "next/head";
import NavBar from "../NavBar/NavBar.react";
import Footer from "../Footer/Footer.react";

import styled from "styled-components";

const Main = styled.div`
  background-color: var(--gray);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const NonHeroContent = styled.div`
  background-color: var(--white);
  transform: translate3d(0, 0, 0);
  z-index: 1;
`;

const Layout = ({ children, hero, title = "Web Developer" }) => {
  return (
    <Main>
      <Head>
        <title>Dan Cortes | {title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Code|Lora:400,400i,700,700i|Montserrat:700,800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {hero}
        <NonHeroContent>
          <NavBar />
          {children}
          <Footer />
        </NonHeroContent>
      </Container>
    </Main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
