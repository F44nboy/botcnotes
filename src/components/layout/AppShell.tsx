// src/components/layout/AppShell.tsx
import type { PropsWithChildren } from "react";
import type { ReactNode } from "react";

interface AppShellProps extends PropsWithChildren {
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AppShell({ header, footer, children, className = "" }: AppShellProps) {
  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-200 ${className}`}>
      {/* Header */}
      <header className="h-12 border-b border-neutral-800 flex items-center px-3">
        {header ?? <div className="font-semibold">BoTCT Notes</div>}
      </header>

      {/* Main content area */}
      <main className="p-3">{children}</main>

      {/* Footer (optional) */}
      {footer && (
        <footer className="h-10 border-t border-neutral-800 flex items-center px-3">
          {footer}
        </footer>
      )}
    </div>
  );
}
