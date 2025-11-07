import type { Player } from "@/types/player";

const players: Player[] = [{
    id: 1,
    seat: 1,  // Sitzplatz (1..n), definiert die Reihenfolge im Kreis
    name: "Anna"      
},{
    id: 2,
    seat: 2,  // Sitzplatz (1..n), definiert die Reihenfolge im Kreis
    name: "Milan"  
}]


// Diese Komponente rendert die Spieler in einem Kreis. Sie ist aber nicht zuständig für die Reprentation des Spieler selbst.
export function PlayerList() {
  const radius = 120; // px

  return (
    <ul className="relative mx-auto size-72 rounded-full border-4 border-neutral-800 list-none p-0 m-0">
    {players.map((player, i) => {
        const angle = (360 / players.length) * i;
        return (
        <li
            key={player.id}
            className="absolute w-14 h-14 rounded-full bg-neutral-800 text-white text-sm
                        flex items-center justify-center shadow"
            style={{
            top: "50%",
            left: "50%",
            // wichtig: zuerst zur Mitte, dann rotieren/verteilen
            transform: `translate(-50%, -50%) rotate(${angle}deg)
                        translate(${radius}px) rotate(-${angle}deg)`,
            transformOrigin: "center center",
            }}
        >
            <p>"Test"</p>
        </li>
        );
    })}
    </ul>

  );
}