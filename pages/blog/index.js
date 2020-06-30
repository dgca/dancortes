import styled, { css } from "styled-components";
import Layout from "../../components/Layout/Layout.react";
import {
  Container,
  Heading,
  Paragraph,
} from "../../components/MainPageTypeset/MainPageTypeset.react";

const Blog = () => {
  return (
    <Layout title="Blog">
      <Container>
        <Heading>Blog</Heading>
        <Paragraph>
          Okay, so first things first, I'm probably not looking to switch jobs.
          That said, if you have an opportunity I <em>must</em> hear about, feel
          free to reach out.
        </Paragraph>
        <Paragraph>
          Aside from that, if you need some freelance work done, need general
          development help, want me to speak at your event, need a belay
          partner, or want to do a cross country bike ride, hit me up and I'll
          be in touch as soon as I can.
        </Paragraph>
      </Container>
    </Layout>
  );
};

export default Blog;
