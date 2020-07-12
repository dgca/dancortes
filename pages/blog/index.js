import { useMemo } from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../../components/Layout/Layout.react";
import { Container } from "../../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../../components/Heading/Heading.react";
import BlogPublishDate from "../../components/BlogPublishDate/BlogPublishDate.react";
import getBlogsList from "../../utils/getBlogList";

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

export default function Blog({ blogsList }) {
  return (
    <Layout title="Dan Cortes | Blog">
      <Container>
        <Heading>Blog Posts</Heading>
        <div>
          <ul>
            {blogsList.map((item) => (
              <li key={item.slug}>
                <BlogItem {...item} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Layout>
  );
}

function BlogItem({ slug, title, excerpt, date }) {
  return (
    <BlogItemWrapper>
      <BlogTitle as="h2" align="left" size="m">
        <Link href={`/blog/${slug}`}>
          <a>{title}</a>
        </Link>
      </BlogTitle>
      <Excerpt>{excerpt}</Excerpt>
      <BlogPublishDate date={date} />
    </BlogItemWrapper>
  );
}

export async function getStaticProps() {
  return {
    props: {
      blogsList: getBlogsList(),
    },
  };
}
