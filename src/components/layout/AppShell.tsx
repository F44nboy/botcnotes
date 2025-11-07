// src/components/layout/AppShell.tsx
import type { PropsWithChildren } from "react";
import { NewGameSetup } from "@/components/ui/NewGameSetup";
import type { ReactNode } from "react";
import { useState } from "react";
import { HeaderBar } from "../ui/HeaderBar";

interface AppShellProps extends PropsWithChildren {
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AppShell({footer, children, className = "" }: AppShellProps) {
  const [isSetupVisible, setIsSetupVisible] = useState(false);

  return (
    <div className={`min-h-screen text-neutral-200 bg-[url(/background.webp)] bg-cover bg-center px-16 pt-4 ${className}`}>
      <HeaderBar
        isSetupVisible={isSetupVisible}
        setIsSetupVisible={setIsSetupVisible}
      />
      <main className="p-3">{isSetupVisible && <NewGameSetup />}{!isSetupVisible && children}</main>

      {/* Footer (optional) */}
      {footer && (
        <footer className="h-10 border-t border-neutral-800 flex items-center px-3">
          {footer}
        </footer>
      )}
    </div>
  );
}
