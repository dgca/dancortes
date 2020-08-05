import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import { atAndBelow, bp } from "../../styles/breakpoints";

import Paragraph from "../Paragraph/Paragraph.react";

const Wrapper = styled.div`
  p,
  figure,
  ul,
  ol pre,
  h2 {
    margin-bottom: 2.5rem;
  }

  pre {
    border-radius: 1rem;
    font-size: max(0.8em, 16px);
    margin-bottom: 2.5rem !important; /* Overrides react-syntax-highlighter */
  }

  p > code,
  li > code {
    background-color: #f5f7ff;
    border-radius: 0.25em;
    color: #41496b;
    display: inline-block;
    font-size: 0.9em;
    line-height: 1em;
    padding: 0.1em 0.2em;
  }

  ul {
    list-style: disc;
    list-style-position: inside;
  }

  li {
    margin-bottom: 1rem;
  }

  a {
    color: var(--blue);

    &:visited {
      color: var(--purple);
    }
  }

  blockquote {
    border-left: 4px solid var(--gray);
    padding-left: 2em;
  }

  hr {
    background-color: var(--blue);
    border: 0;
    border-radius: 4px;
    height: 4px;
    margin: 2rem 0;
  }

  figure {
    text-align: center;
  }

  ${atAndBelow(
    bp.s,
    (css) => css`
      font-size: 0.8em;
    `
  )}
`;

export default function Markdown({ source, className }) {
  return (
    <Wrapper className={className}>
      <ReactMarkdown
        source={source}
        escapeHtml={false}
        renderers={{
          code: CodeBlock,
          paragraph: Paragraph,
          link: Anchor,
        }}
      />
    </Wrapper>
  );
}

function CodeBlock({ value, language }) {
  if (language === "dangerouslySetInnerHTML") {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
  }
  return (
    <SyntaxHighlighter showLineNumbers language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  );
}

function Anchor({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
