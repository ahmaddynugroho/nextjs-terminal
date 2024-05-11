"use client";

import { useEffect, useState } from "react";

export default function Prompt({
  userPath,
  userCommand,
  isLatest,
}: {
  userPath: string;
  userCommand: string;
  isLatest: boolean;
}) {
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(!cursor);
    }, 200);
    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span>
      <span className="text-green-500">you@miku4j</span>
      <span>:</span>
      <span className="text-blue-500">{userPath}</span>
      <span>$ {userCommand}</span>
      {isLatest && <span className={cursor ? "inline" : "hidden"}>_</span>}
    </span>
  );
}
