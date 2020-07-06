import { useMemo } from "react";
import styled from "styled-components";

const PublishDate = styled.p`
  font-size: 0.8em;
  font-family: var(--font-code);
`;

export default function BlogPublishDate({ date }) {
  const dateString = useMemo(() => new Date(date).toDateString(), [date]);
  return (
    <PublishDate>
      Published <time dateTime={date}>{dateString}</time>
    </PublishDate>
  );
}
