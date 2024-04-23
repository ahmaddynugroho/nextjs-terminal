"use client";

export default function Prompt({
  userPath,
  userCommand,
}: {
  userPath: string;
  userCommand: string;
}) {
  return (
    <span>
      <span className="text-green-500">you@miku4j</span>
      <span>:</span>
      <span className="text-blue-500">{userPath}</span>
      <span>$ {userCommand}</span>
    </span>
  );
}
