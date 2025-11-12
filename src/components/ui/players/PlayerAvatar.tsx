// src/components/PlayerCard.tsx
import type { Player } from "@/database/types/player";
import { cn } from "@/lib/utils"; // optional: deine className-merge util
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu";

type PlayerCardProps = {
  player: Player;
  size: number; // Durchmesser des Kreissymbols in px
};

export function PlayerAvatar({ player, size }: PlayerCardProps) {
  const isAlive = player.alive ?? true;

  const style = {
    width: size,
    height: size,
  };




  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          style={style}
          className={cn(
            "rounded-full flex items-center justify-center shadow select-none",
            "text-white text-xs sm:text-sm font-medium",
            isAlive ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-700/70 line-through"
          )}
        >
          <div className="flex flex-col items-center leading-tight px-1">
            <span className="">{player.name}</span>
            <span className="text-[10px] opacity-70">Seat {player.seat}</span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem >
          Details / Notizen öffnen
        </DropdownMenuItem>
        <DropdownMenuItem >
          "Als tot markieren" : "Als lebend markieren"
        </DropdownMenuItem>
        {/* Platz für weitere Aktionen: drunk/poisoned toggles etc. */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
