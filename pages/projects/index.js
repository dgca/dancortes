import { useMemo } from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../../components/Layout/Layout.react";
import { Container } from "../../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../../components/Heading/Heading.react";

const BlogItemWrapper = styled.article`
  margin-bottom: 5rem;
`;

const BlogTitle = styled(Heading)`
  font-size: 2.6rem;
  max-width: 100%;
  margin-bottom: 0.5em;

  a {
    color: var(--blue);

    &:visited {
      color: var(--purple);
    }
  }
`;

const Excerpt = styled.p`
  margin-bottom: 0.5em;
`;

export default function Blog() {
  return (
    <Layout title="Dan Cortes | Projects">
      <Container>
        <Heading>Projects</Heading>
        <div>
          <ul>
            {/* {blogsList.map((item) => (
              <li key={item.slug}>
                <BlogItem {...item} />
              </li>
            ))} */}
          </ul>
        </div>
      </Container>
    </Layout>
  );
}
