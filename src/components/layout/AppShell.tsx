// src/components/layout/AppShell.tsx
import { GameSetupForm } from "@/components/ui/GameSetupForm";
import { useState, type ReactNode } from "react";
import { HeaderBar } from "../ui/HeaderBar";


type AppShellProps = {
  children?: ReactNode;
};

export function AppShell({children}: AppShellProps) {
  const [isSetupVisible, setIsSetupVisible] = useState(false);

  return (
    <div className={`min-h-screen text-neutral-200 bg-[url(/background.webp)] bg-cover bg-center px-2 sm:px-3 md:px-5 pt-4 pb-4 flex flex-col`}>
      {/* HeaderBar Should always be visible. Therefore it is included here */}
      <HeaderBar
        isSetupVisible={isSetupVisible}
        setIsSetupVisible={setIsSetupVisible}
      />
      {isSetupVisible && 
      <GameSetupForm isSetupVisible={isSetupVisible} setIsSetupVisible={setIsSetupVisible}/>
      }
      <main className="pt-3 flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
        {!isSetupVisible && children}
      </main>

    </div>
  );
}
