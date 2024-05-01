"use client";

import { useEffect, useState } from "react";
import Prompt from "./ui/prompt";

export default function Home() {
  const [path, setPath] = useState("~");
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<
    {
      path: string;
      command: string;
    }[]
  >([]);
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
          setHistory([...history, { path, command }]);
          setCommand("WIP bro");
          console.log(dir);
        } else if (command === "ls") {
          const lsDir = dir.map((d) => ({ path: path, command: <li>{d}</li> }));
          // setHistory([...history, ...lsDir]);
        } else {
          setHistory([...history, { path, command }]);
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
          history.map((pathPrompt) => (
            <li>
              <Prompt
                userPath={pathPrompt.path}
                userCommand={pathPrompt.command}
                isLatest={false}
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
