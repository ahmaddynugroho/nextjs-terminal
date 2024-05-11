"use client";

import { useEffect, useState } from "react";
import Prompt from "./ui/prompt";
import { Console } from "console";

type History = {
  path: string;
  command: string;
  type: "in" | "out"; // in means command; out means output from command
}[];

export default function Home() {
  const [path, setPath] = useState("~");
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<History>([]);
  const [dir, setDir] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z0-9 !@#$%^&*()-_=+[{\]};:'"\<.>/?|\\]+$/;
      const key = e.key;
      if (key === "Enter") {
        if (command === "cls") {
          setHistory([]);
          setCommand("");
        } else if (command.split(" ")[0] === "mkdir") {
          const newDir = command.split(" ")[1];
          setDir([...dir, newDir]);
          setHistory([...history, { path, command, type: "in" }]);
          setCommand("");
        } else if (command === "ls") {
          const formatDir: History = dir.map((d) => ({
            path,
            command: d,
            type: "out",
          }));
          setHistory([...history, { path, command, type: "in" }, ...formatDir]);
          setCommand("");
        } else {
          setHistory([...history, { path, command, type: "in" }]);
          setCommand("");
        }
      } else if (key === "Backspace") {
        setCommand(`${command.slice(0, -1)}`);
      } else if (regex.test(key) && key.length == 1) {
        setCommand(`${command}${key}`);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [command]);

  return (
    <>
      <ul className="max-w-full">
        {history &&
          history.map((pathPrompt, i) => (
            <li key={i}>
              <Prompt
                userPath={pathPrompt.path}
                userCommand={pathPrompt.command}
                isLatest={false}
                textOutput={
                  pathPrompt.type === "out" ? pathPrompt.command : undefined
                }
              />
            </li>
          ))}
        <li>
          <Prompt userPath={path} userCommand={command} isLatest={true} />
        </li>
      </ul>
    </>
  );
}
