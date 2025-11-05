import type { ReactNode } from "react";

type SetupLayoutProps  = {
  sidebar?: ReactNode;
  content: ReactNode;
}

export function SetupLayout({ sidebar, content }: SetupLayoutProps) {
  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
      {sidebar && (
        <aside className="border border-neutral-800 rounded-lg p-3 overflow-y-auto">
          {sidebar}
        </aside>
      )}
      <section className="border border-neutral-800 rounded-lg p-3 overflow-y-auto">
        {content}
      </section>
    </div>
  );
}
