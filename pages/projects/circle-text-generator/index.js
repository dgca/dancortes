import Layout from "../../../components/Layout/Layout.react";
import CircleTextGenerator from "../../../projects/CircleTextGenerator/CircleTextGenerator";

export default function Post() {
  return (
    <Layout
      title="Circle Text Generator"
      ogImage="2022-02-15-front-end-mock-technical-interview.jpg"
    >
      <CircleTextGenerator />
    </Layout>
  );
}
