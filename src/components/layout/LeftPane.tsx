import { PlayerList } from "@/components/ui/players/PlayerList";


export function LeftPane() {

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2 flex-none">
        Townsquare
      </h2>
      <div className="flex-1 min-h-0">
        <PlayerList />
      </div>
    </div>
  );
}
