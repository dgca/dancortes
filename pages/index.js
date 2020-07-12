import { useMemo } from "react";
import styled, { css } from "styled-components";
import { Container } from "../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../components/Heading/Heading.react";
import Layout from "../components/Layout/Layout.react";
import QuoteBox from "../components/QuoteBox/QuoteBox.react";
import SkillsList from "../components/SkillsList/SkillsList.react";
import Hero from "../components/Hero/Hero.react";
import CyclicalContent from "../components/CyclicalContent/CyclicalContent.react";

export const Paragraph = styled.p`
  &:not(:last-child) {
    margin-bottom: 25px;
  }

  ${({ small }) =>
    small &&
    css`
      font-size: 0.9em;
    `}
`;

export default function Home() {
  return (
    <Layout hero={<Hero />} title="Dan Cortes | Web Developer">
      <main>
        <Container>
          <Heading>
            Front-End Focused, Full-Stack Adept, Javascript Nerd
          </Heading>
          <Paragraph>
            Hi, I'm Dan. I've been building digital products since 2012. In my
            career, I've been involved in many parts of the product development
            process, from strategy, to UX research, UI design, and development.
          </Paragraph>
          <Paragraph>
            Now I focus primarily on web development, where I use my product
            background to craft software that is maintainable, scalable, and a
            pleasure to use.
          </Paragraph>
          <Paragraph>
            Aside from a career, buildling digital products is both a passion
            and hobby of mine, and I'd like to think I've gotten pretty good at
            it by now. But don't take my word my word for it, here's what folks
            I've worked with have had to say!{" "}
          </Paragraph>
          <Paragraph small>
            <i>
              For real, I grabbed these quotes from some peer reviews I had
              lying around. I've worked with some incredibly nice people over
              the years
            </i>
            &nbsp;🤗
          </Paragraph>
        </Container>
        <QuoteBox>
          <CyclicalContent
            items={useMemo(
              () => [
                <p>
                  Dan is always up for a challenge and willing to help out on
                  just about anything. I appreciate being able to bounce ideas
                  and code changes off of him.
                </p>,
                <p>
                  You can usually point to Dan's code as a good example for just
                  about anything.
                </p>,
                <p>
                  Dan is a great technical leader. He's a talented developer
                  with a rare skillset that also makes him a good teacher.
                </p>,
                <p>
                  Dan consistently impresses me with his encyclopedia-like
                  knowledge of front end.
                </p>,
              ],
              []
            )}
          />
        </QuoteBox>
        <SkillsList
          heading="Some things I'm good at"
          items={[
            "Javascript",
            "React/React Native",
            "Node",
            "HTML/CSS",
            "Front-end Architecture",
            "UI/UX Design",
            "Accessibility",
            "...and more!",
          ]}
        />
      </main>
    </Layout>
  );
}
