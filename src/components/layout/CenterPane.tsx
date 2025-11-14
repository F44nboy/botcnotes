import { PlayerList } from "../ui/players/PlayerList";

export function CenterPane() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="text-center text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2 flex-none">
        Townsquare
      </h2>
      <div className="flex-1">
        <PlayerList  />
      </div>
    </div>
  );
}