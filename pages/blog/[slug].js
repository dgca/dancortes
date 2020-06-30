import Link from "next/link";

import Layout from "../../components/Layout/Layout.react";
import {
  Container,
  Heading,
  Paragraph,
} from "../../components/MainPageTypeset/MainPageTypeset.react";

import getBlogsList from "../../utils/getBlogList";

export default function Post({ blogsList }) {
  console.log({ blogsList });
  return (
    <Layout title="Blog">
      <Container>
        <h1>Post</h1>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      post: {},
      prev: {},
      next: {},
    },
  };
}

export async function getStaticPaths() {
  const blogsList = getBlogsList();
  return {
    paths: blogsList.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
