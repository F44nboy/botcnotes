import { PlayerList } from "@/components/ui/players/PlayerList";

export function LeftPane() {


  return (
    <>
      <h2 className="text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2">
        Townsquare
      </h2>
      <PlayerList />
    </>
  );
}