import styled from "styled-components";

import Layout from "../../../components/Layout/Layout.react";
import { Container } from "../../../components/MainPageTypeset/MainPageTypeset.react";

import CircleTextGenerator from '../../../projects/CircleTextGenerator/CircleTextGenerator'

export default function Post() {
  return (
    <Layout title='Circle Text Generator' ogImage={null}>
      <CircleTextGenerator />
    </Layout>
  );
}