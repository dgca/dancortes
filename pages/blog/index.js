import Link from "next/link";

import Layout from "../../components/Layout/Layout.react";
import {
  Container,
  Paragraph,
} from "../../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../../components/Heading/Heading.react";

import getBlogsList from "../../utils/getBlogList";

export default function Blog({ blogsList }) {
  return (
    <Layout title="Blog">
      <Container>
        <Heading>Blog Posts</Heading>
        <article>
          <ul>
            {blogsList.map(({ slug, date, title, excerpt }) => (
              <li key={slug}>
                <h2>
                  <Link href={`/blog/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </h2>
                <p>{excerpt}</p>
                <p>{date}</p>
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      blogsList: getBlogsList(),
    },
  };
}
