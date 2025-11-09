// src/components/PlayerCard.tsx
import { useMemo } from "react";
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
  onToggleAlive?: (id: number, next: boolean) => void;
  onOpenDetails?: (p: Player) => void;
};

export function PlayerCard({ player, size, onToggleAlive, onOpenDetails }: PlayerCardProps) {
  const isAlive = player.alive ?? true;

  const style = useMemo<React.CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  const initials = useMemo(() => {
    const safe = (player.name ?? "").trim();
    if (safe.length === 0) return "?";

    const parts = safe.split(/\s+/);

    const firstChar = parts[0]?.charAt(0) ?? "";
    if (parts.length >= 2) {
      const secondChar = parts[1]?.charAt(0) ?? "";
      const combined = (firstChar + secondChar).toUpperCase();
      return combined || "?";
    }

    return (firstChar || "?").toUpperCase();
  }, [player.name]);


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
          title={player.name}
          onDoubleClick={() => onOpenDetails?.(player)}
        >
          <div className="flex flex-col items-center leading-tight px-1">
            <span className="truncate max-w-[90%]">{player.name}</span>
            <span className="text-[10px] opacity-70">Seat {player.seat}</span>
          </div>

          {/* kleine Badge mit Initialen oben rechts */}
          <span
            className="absolute -top-1 -right-1 rounded-full bg-black/60 text-[10px] px-1.5 py-0.5"
            aria-hidden
          >
            {initials}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[160px]">
        <DropdownMenuItem onClick={() => onOpenDetails?.(player)}>
          Details / Notizen öffnen
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleAlive?.(player.id, !isAlive)}>
          {isAlive ? "Als tot markieren" : "Als lebend markieren"}
        </DropdownMenuItem>
        {/* Platz für weitere Aktionen: drunk/poisoned toggles etc. */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
