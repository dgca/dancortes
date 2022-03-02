import styled from "styled-components";

import Layout from "../../components/Layout/Layout.react";
import { Container } from "../../components/MainPageTypeset/MainPageTypeset.react";

export default function Post(props) {
  const { post, prevPostHref, nextPostHref } = props;
  const { title, content, date, ogImage } = post;
  return (
    <Layout title={title} ogImage={ogImage}>
      <Container>
        Hello
      </Container>
    </Layout>
  );
}