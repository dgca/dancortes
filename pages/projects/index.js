import Link from "next/link";
import styled from "styled-components";

import Layout from "../../components/Layout/Layout.react";
import { Container } from "../../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../../components/Heading/Heading.react";

const ProjectItemWrapper = styled.article`
  background-color: var(--pink);
  border: 1px dashed var(--blue);
  box-shadow: 0.25em 0.5em 1em rgba(0, 0, 0, 0.25);
  padding: 1.25em 1.5em;
  margin-bottom: 5rem;
`;

const Title = styled(Heading)`
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

const P = styled.p`
  margin-bottom: 0.5em;
`;

export default function Blog() {
  return (
    <Layout title="Dan Cortes | Blog">
      <Container>
        <Heading>Projects</Heading>
        <div>
          <ul>
            <li>
              <ProjectItemWrapper>
                <Title as="h2" align="left" size="m">
                  <Link href={`/projects/circle-text-generator`}>
                    <a>Circle Text Generator</a>
                  </Link>
                </Title>
                <P>
                  This circle text generator lets you easily create an image of
                  text that follows the curve of a circle. You can put an image
                  inside the text as well.
                </P>
              </ProjectItemWrapper>
            </li>
          </ul>
        </div>
      </Container>
    </Layout>
  );
}
