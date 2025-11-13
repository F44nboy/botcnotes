// src/components/ui/players/PlayerAvatar.tsx
import type { Player } from "@/database/types/player";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu";

export type PlayerAvatarProps = {
  player: Player;
  size?: number;
};

// src/components/ui/players/PlayerAvatar.tsx
export function PlayerAvatar({ player, size }: PlayerAvatarProps) {
  const alive = player.alive ?? true;

  const style: React.CSSProperties = {
    width: size ?? "var(--icon, 48px)",
    height: size ?? "var(--icon, 48px)",
    backgroundImage: "url('/token-background.webp')",
    backgroundSize: "120%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "9999px",
    overflow: "hidden",
  };

  const btnClass = alive
    ? "bg-neutral-800 hover:bg-neutral-700"
    : "bg-neutral-700/70 line-through";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Relativer Container für die absolut platzierte Namensbox */}
        <div className="relative flex items-center justify-center">
          {/* Avatar-Button */}
          <button
            type="button"
            title={player.name}
            aria-label={`Player ${player.name}, seat ${player.seat}`}
            style={style}
            className={`rounded-full shadow select-none ${btnClass}`}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem>Details / Notizen öffnen</DropdownMenuItem>
        <DropdownMenuItem>{alive ? "Als tot markieren" : "Als lebend markieren"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
