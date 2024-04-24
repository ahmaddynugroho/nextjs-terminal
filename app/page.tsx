"use client";

import { useEffect, useState } from "react";
import Prompt from "./ui/prompt";

export default function Home() {
  const [path, setPath] = useState("~");
  const [command, setCommand] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z0-9 !@#$%^&*()-_=+[{\]};:'"\<.>/?|\\]+$/;
      const key = e.key;
      if (key === "Backspace") {
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
        <li>
          <Prompt userPath={path} userCommand={command} />
        </li>
        {/* <li>
          <Prompt userPath="~/.config/nvim" userCommand="nvim x.html" />
        </li> */}
      </ul>
    </>
  );
}
