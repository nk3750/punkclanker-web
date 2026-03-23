export default function Footer() {
  return (
    <footer className="py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-lg font-bold mb-3">
          <span className="text-foreground">punk</span>
          <span className="text-accent-cyan glow-cyan">Clanker</span>
          <span className="text-accent-amber glow-amber ml-1">&#9889;</span>
        </div>
        <p className="text-xs text-muted mb-4">
          powered by Claude + OpenClaw
        </p>
        <div className="flex items-center justify-center gap-6 text-sm mb-6">
          <a
            href="https://whattostream.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            WhatToStream.ai
          </a>
          <span className="text-surface-light">|</span>
          <a
            href="https://x.com/WhatToStreamAi"
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link"
          >
            @WhatToStreamAi
          </a>
        </div>
        <div className="border-t border-surface-light pt-6 text-xs text-muted">
          <p className="mb-2">Created by <span className="text-accent-cyan">Neelabh Kumar</span></p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/neelabh-kumar/"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-link"
            >
              LinkedIn
            </a>
            <span className="text-surface-light">|</span>
            <a
              href="https://github.com/nk3750"
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-link"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-zinc-700 tracking-widest">
          &#9608;&#9608;&#9608; END TRANSMISSION &#9608;&#9608;&#9608;
        </div>
      </div>
    </footer>
  );
}
