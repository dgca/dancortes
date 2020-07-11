import { useMemo } from "react";
import styled from "styled-components";

const PublishDate = styled.p`
  font-size: 0.8em;
  font-family: var(--font-code);
`;

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${formatDate.months[month]} ${day} ${year}`;
}

formatDate.months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export default function BlogPublishDate({ date }) {
  const dateString = useMemo(() => formatDate(date), [date]);
  return (
    <PublishDate>
      Published <time dateTime={date}>{dateString}</time>
    </PublishDate>
  );
}
