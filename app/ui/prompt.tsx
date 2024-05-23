"use client";

import { useEffect, useState } from "react";

export default function Prompt({
  userPath,
  value,
  isLatest,
  textOutput,
}: {
  userPath: string;
  value: string;
  isLatest: boolean;
  textOutput?: string;
}) {
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(!cursor);
    }, 200);
    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <>
      {textOutput ? (
        <span>{textOutput}</span>
      ) : (
        <span>
          <span className="text-green-500">you@miku4j</span>
          <span>:</span>
          <span className="text-blue-500">{userPath}</span>
          <span>$ {value}</span>
          {isLatest && <span className={cursor ? "inline" : "hidden"}>_</span>}
        </span>
      )}
    </>
  );
}
