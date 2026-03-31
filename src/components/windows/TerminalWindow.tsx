import { useEffect, useState } from "react";
import "./TerminalWindow.css";

const commandText = '$ echo "HELLO WORLD"';

const ascii = `
██╗  ██╗███████╗██╗     ██╗      ██████╗
██║  ██║██╔════╝██║     ██║     ██╔═══██╗
███████║█████╗  ██║     ██║     ██║   ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║
██║  ██║███████╗███████╗███████╗╚██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝

██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
 ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
`;

export default function TerminalTyping() {
  const [typedCommand, setTypedCommand] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);

  const [displayAscii, setDisplayAscii] = useState("");
  const [asciiIndex, setAsciiIndex] = useState(0);

  const [phase, setPhase] = useState<"command" | "wait" | "ascii" | "done">(
    "command"
  );

  useEffect(() => {
    if (phase !== "command") return;

    if (commandIndex < commandText.length) {
      const timeout = setTimeout(() => {
        setTypedCommand((prev) => prev + commandText[commandIndex]);
        setCommandIndex((prev) => prev + 1);
      }, 70);

      return () => clearTimeout(timeout);
    }

    const waitTimeout = setTimeout(() => {
      setPhase("wait");
    }, 350);

    return () => clearTimeout(waitTimeout);
  }, [phase, commandIndex]);

  useEffect(() => {
    if (phase !== "wait") return;

    const timeout = setTimeout(() => {
      setPhase("ascii");
    }, 250);

    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "ascii") return;

    if (asciiIndex < ascii.length) {
      const timeout = setTimeout(() => {
        setDisplayAscii((prev) => prev + ascii[asciiIndex]);
        setAsciiIndex((prev) => prev + 1);
      }, 4);

      return () => clearTimeout(timeout);
    }

    setPhase("done");
  }, [phase, asciiIndex]);

  const showCommandCursor = phase === "command";
  const showAsciiCursor = phase === "ascii" || phase === "done";

  return (
    <div className="terminal">
      <div className="body">
        <p className="command">
          {typedCommand.split("").map((char, i) => {
            if (char === " ") return <span key={`cmd-space-${i}`}> </span>;

            return (
              <span
                key={`cmd-${char}-${i}`}
                className="rainbow-char rainbow-char-command"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {char}
              </span>
            );
          })}
          {showCommandCursor && <span className="cursor">█</span>}
        </p>

        {(phase === "ascii" || phase === "done") && (
          <pre className="ascii">
            {displayAscii.split("").map((char, i) => {
              if (char === "\n") return "\n";
              if (char === " ") return <span key={`ascii-space-${i}`}> </span>;

              return (
                <span
                  key={`ascii-${char}-${i}`}
                  className="rainbow-char rainbow-char-ascii"
                  style={{ animationDelay: `${i * 0.02}s` }}
                >
                  {char}
                </span>
              );
            })}
            {showAsciiCursor && <span className="cursor">█</span>}
          </pre>
        )}
      </div>
    </div>
  );
}