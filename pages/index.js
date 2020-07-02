import { useMemo } from "react";
import {
  Container,
  Paragraph,
} from "../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../components/Heading/Heading.react";
import Layout from "../components/Layout/Layout.react";
import QuoteBox from "../components/QuoteBox/QuoteBox.react";
import SkillsList from "../components/SkillsList/SkillsList.react";
import Hero from "../components/Hero/Hero.react";
import CyclicalContent from "../components/CyclicalContent/CyclicalContent.react";

export default function Home() {
  return (
    <Layout hero={<Hero />} title="Dan Cortes | Web Developer">
      <main>
        <Container>
          <Heading>
            Front-end focused, full-stack adept, Javascript nerd
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
            But don't take my word for it! Here's what folks who have worked
            extensively with me have had to say:
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
