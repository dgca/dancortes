import Layout from "../../../components/Layout/Layout.react";
import CircleTextGenerator from "../../../projects/CircleTextGenerator/CircleTextGenerator";

export default function Post() {
  return (
    <Layout
      title="Circle Text Generator"
      description="This circle text generator lets you easily create an image of text
      that follows the curve of a circle. You can put an image inside the
      text for extra swag factor."
      ogImage="project-circle-text-generator.jpg"
    >
      <CircleTextGenerator />
    </Layout>
  );
}
