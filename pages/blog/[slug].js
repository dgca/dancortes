import Link from "next/link";

import Markdown from "../../components/Markdown/Markdown.react";
import Layout from "../../components/Layout/Layout.react";
import { Container } from "../../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../../components/Heading/Heading.react";

import getBlogsList from "../../utils/getBlogList";

export default function Post(props) {
  globalThis.test = props;
  const { post, prevPostHref, nextPostHref } = props;
  const { title, content, date } = post;
  return (
    <Layout title={title}>
      <Container>
        <Heading align="left">{title}</Heading>
        <Markdown source={content} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const blogsList = getBlogsList();
  const postIndex = blogsList.findIndex(
    ({ slug: postSlug }) => slug === postSlug
  );
  const makePostHref = (slug = null) => slug && `/blog/${slug}`;
  return {
    props: {
      post: blogsList[postIndex],
      prevPostHref: makePostHref(blogsList[postIndex - 1]?.slug),
      nextPostHref: makePostHref(blogsList[postIndex + 1]?.slug),
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
