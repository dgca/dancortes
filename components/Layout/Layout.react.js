import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import NavBar from "../NavBar/NavBar.react";
import Footer from "../Footer/Footer.react";
import { hostname } from "../../lib/constants";

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

const Layout = ({
  children,
  hero,
  title,
  description = `Hi, I'm Dan Cortes, a web developer who focuses on front-end, JavaScript, and React. Here's where I write about those things (and more).`,
  ogType = "website",
  ogImage = "og-image-default.jpg",
}) => {
  const router = useRouter();
  const canonical = `${hostname}${router.asPath.split("?")[0]}`;
  return (
    <Main>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: canonical,
          type: ogType,
          images: [
            {
              url: `${hostname}/images/og-images/${ogImage}`,
              height: 630,
              width: 1200,
            },
          ],
        }}
        twitter={{
          handle: "@dan_cortes_",
          cardType: "summary_large_image",
        }}
      />
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
  title: PropTypes.string.isRequired,
};

export default Layout;
