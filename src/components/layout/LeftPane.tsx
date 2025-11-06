// src/components/layout/LeftPane.tsx
export function LeftPane() {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2">
        Players
      </h2>
      <div className="space-y-2">
        {/* später: PlayersPanel */}
        <div className="h-24 rounded-md bg-neutral-900/60 border border-neutral-800" />
        <div className="h-24 rounded-md bg-neutral-900/60 border border-neutral-800" />
        <div className="h-24 rounded-md bg-neutral-900/60 border border-neutral-800" />
      </div>
    </div>
  );
}
