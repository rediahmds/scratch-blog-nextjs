import React from 'react';
import { parseISO, format, formatDistanceToNow } from 'date-fns';

// TODO: Create a component to show the date of a certain post. Use date-fns
export default function DateTime({
  dateStr,
  home,
}: {
  dateStr: string;
  home?: boolean;
}) {
  const parsedDate = parseISO(dateStr); // Returns date type
  return (
    <div>
      <time dateTime={dateStr}>{format(parsedDate, 'MMMM d, yyyy')}</time>
      {!home && (
        <div>
          <span>{`${formatDistanceToNow(parsedDate)} ago`}</span>
        </div>
      )}
    </div>
  );
}
