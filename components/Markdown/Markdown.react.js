import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import { atAndBelow, bp } from "../../styles/breakpoints";

import Paragraph from "../Paragraph/Paragraph.react";

const Wrapper = styled.div`
  p {
    margin-bottom: 2.5rem;

    > code {
      background-color: var(--black);
      border-radius: 0.25em;
      color: var(--yellow);
      display: inline-block;
      font-size: 0.9em;
      line-height: 1em;
      padding: 0.1em 0.2em;
    }
  }

  a {
    color: var(--blue);

    &:visited {
      color: var(--purple);
    }
  }

  pre {
    border-radius: 1rem;
    font-size: max(0.8em, 16px);
  }

  blockquote {
    border-left: 4px solid var(--gray);
    padding-left: 2em;
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
    <SyntaxHighlighter language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  );
}
