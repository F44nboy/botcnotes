// src/components/layout/AppShell.tsx
import type { PropsWithChildren } from "react";
import { GameSetupForm } from "@/components/ui/GameSetupForm";
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
    <div className={`min-h-screen text-neutral-200 bg-[url(/background.webp)] bg-cover bg-center px-5 pt-4 flex flex-col${className}`}>
      <HeaderBar
        isSetupVisible={isSetupVisible}
        setIsSetupVisible={setIsSetupVisible}
      />
      <GameSetupForm isSetupVisible={isSetupVisible} setIsSetupVisible={setIsSetupVisible} />
      <main className="pt-3 flex-1 min-h-0 overflow-y-auto overflow-x-hidden">{!isSetupVisible && children}</main>

      {/* Footer (optional) */}
      {footer && (
        <footer className="h-10 border-t border-neutral-800 flex items-center px-3">
          {footer}
        </footer>
      )}
    </div>
  );
}
