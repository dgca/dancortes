import Layout from "../../../components/Layout/Layout.react";
import CircleTextGenerator from "../../../projects/CircleTextGenerator/CircleTextGenerator";

export default function Post() {
  return (
    <Layout
      title="Circle Text Generator"
      ogImage="project-circle-text-generator.jpg"
    >
      <CircleTextGenerator />
    </Layout>
  );
}
