"use client";

import { useEffect, useState } from "react";
import Prompt from "./ui/prompt";
import { Console } from "console";

type History = {
  path: string;
  value: string;
  type: "in" | "out"; // in means value; out means output from command
}[];

export default function Home() {
  const [path, setPath] = useState("~");
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<History>([]);
  const [dir, setDir] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z0-9 !@#$%^&*()-_=+[{\]};:'"\<.>/?|\\]+$/;
      const key = e.key;
      if (key === "Enter") {
        if (value === "cls") {
          setHistory([]);
          setValue("");
        } else if (value.split(" ")[0] === "mkdir") {
          const newDir = value.split(" ")[1];
          setDir([...dir, newDir]);
          setHistory([...history, { path, value, type: "in" }]);
          setValue("");
        } else if (value === "ls" || value.split(" ")[0] === "ls") {
          const visibleDir = dir.filter(d => !d.includes('.'))
          let formatDir: History = visibleDir.map((d) => ({
            path,
            value: d,
            type: "out",
          }));
          if (value.split(" ")[1] === "-a") {
            formatDir = dir.map((d) => ({
              path,
              value: `drwxr-xr-x 2 you you    4096 May  2 10:25 ${d}`,
              type: "out",
            }));
          }
          setHistory([...history, { path, value, type: "in" }, ...formatDir]);
          setValue("");
        } else {
          setHistory([...history, { path, value, type: "in" }]);
          setValue("");
        }
      } else if (key === "Backspace") {
        setValue(`${value.slice(0, -1)}`);
      } else if (regex.test(key) && key.length == 1) {
        setValue(`${value}${key}`);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);

  return (
    <>
      <ul className="max-w-full">
        {history &&
          history.map((pathPrompt, i) => (
            <li key={i}>
              <Prompt
                userPath={pathPrompt.path}
                value={pathPrompt.value}
                isLatest={false}
                textOutput={
                  pathPrompt.type === "out" ? pathPrompt.value : undefined
                }
              />
            </li>
          ))}
        <li>
          <Prompt userPath={path} value={value} isLatest={true} />
        </li>
      </ul>
    </>
  );
}
