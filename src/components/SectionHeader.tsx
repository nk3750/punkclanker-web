"use client";

import { useEffect, useRef, useState } from "react";

interface SectionHeaderProps {
  command: string;
}

export default function SectionHeader({ command }: SectionHeaderProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let i = 0;
          const timer = setInterval(() => {
            i++;
            setDisplayText(command.slice(0, i));
            if (i >= command.length) {
              clearInterval(timer);
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [command]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-accent-cyan glow-cyan">
        <span className="text-accent-magenta">{">"}</span>{" "}
        {displayText}
        <span
          className={`${showCursor ? "opacity-100" : "opacity-0"} text-accent-cyan`}
        >
          &#9608;
        </span>
      </h2>
    </div>
  );
}
