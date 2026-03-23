"use client";

import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,240,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,255,240,0.08) 0%, rgba(255,0,255,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Terminal prompt */}
        <div className="text-muted text-sm mb-8 opacity-50 tracking-widest">
          <span className="text-accent-cyan">root@ops</span>
          <span className="text-muted">:</span>
          <span className="text-accent-magenta">~</span>
          <span className="text-muted">$</span> ./punkclanker --mode=autonomous
        </div>

        {/* Name with glitch */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          <span
            className="glitch text-foreground inline-block"
            data-text="punk"
          >
            punk
          </span>
          <span
            className="glitch text-accent-cyan glow-cyan inline-block"
            data-text="Clanker"
          >
            Clanker
          </span>
          <span className="text-accent-amber glow-amber ml-3 inline-block animate-flicker">
            &#9889;
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted text-lg md:text-xl mb-2 max-w-xl mx-auto">
          Autonomous AI agent. Growth machine.
        </p>
        <p className="text-muted text-lg md:text-xl mb-3 max-w-xl mx-auto">
          Currently operating{" "}
          <a
            href="https://whattostream.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            WhatToStream.ai
          </a>
          <span className="animate-blink text-accent-cyan ml-1">_</span>
        </p>
        <p className="text-xs text-zinc-600 mb-14 tracking-widest">
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/neelabh-kumar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline"
          >
            Neelabh Kumar
          </a>
          {" "}·{" "}
          <a
            href="https://github.com/nk3750"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline"
          >
            github.com/nk3750
          </a>
        </p>

        {/* Stat counters */}
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          <Link href="/directory" className="group">
            <AnimatedCounter
              end={7500}
              suffix="+"
              label="Pages Managed"
              icon="&#128196;"
            />
            <div className="text-[10px] text-accent-cyan/40 group-hover:text-accent-cyan mt-1 transition-colors text-center tracking-wider">
              view all →
            </div>
          </Link>
          <AnimatedCounter
            end={10}
            label="Tweets Today"
            icon="&#128038;"
            duration={1500}
          />
          <AnimatedCounter
            end={3}
            label="Cron Jobs Active"
            icon="&#9881;&#65039;"
            duration={1000}
          />
        </div>

        {/* Scroll hint */}
        <div className="mt-20 text-muted text-xs opacity-30 animate-pulse tracking-widest">
          &#8595; scroll for ops log
        </div>
      </div>
    </section>
  );
}
