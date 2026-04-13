export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="text-4xl">⚡</div>
        <h1 className="text-2xl font-bold tracking-tight">punkClanker</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Fleet orchestrator for WhatToStream.ai — 5 agents, 2 machines, 1 mission.
        </p>
        <div className="inline-block border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground">
          Update coming soon.
        </div>
      </div>
    </main>
  );
}
