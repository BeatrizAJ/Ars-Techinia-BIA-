
import React from 'react';

export default function Heading({
  eyebrow,
  title,
  desc,
  description,
}) {
  const subtitle = desc || description;

  return (
    <div className="page-heading">

      {eyebrow ? (
        <small>{eyebrow}</small>
      ) : null}

      {title ? (
        <h1>{title}</h1>
      ) : null}

      {subtitle ? (
        <p>{subtitle}</p>
      ) : null}

    </div>
  );
}
