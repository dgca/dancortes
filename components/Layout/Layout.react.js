import PropTypes from "prop-types";
import Head from "next/head";
import Nav from "../Nav/Nav.react";
import Footer from "../Footer/Footer.react";

import styled from "styled-components";

const Main = styled.div`
  background-color: var(--gray);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Children = styled.div`
  background-color: var(--white);
`;

const Layout = ({ children, hero, title = "Dan Cortes | Web Developer" }) => {
  return (
    <Main>
      <Head>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Code|Lora:400,400i,700,700i|Montserrat:700,800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {hero}
        <Nav />
        <Children>{children}</Children>
        <Footer />
      </Container>
    </Main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
