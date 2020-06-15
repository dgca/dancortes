import {
  Container,
  Heading,
  Paragraph,
} from "../components/MainPageTypeset/MainPageTypeset.react";
import Layout from "../components/Layout/Layout.react";
import QuoteBox from "../components/QuoteBox/QuoteBox.react";
import SkillsList from "../components/SkillsList/SkillsList.react";
import Hero from "../components/Hero/Hero.react";

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
          Dan is a great technical leader. He's a talented developer with a rare
          skillset that also makes him a good teacher.
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
