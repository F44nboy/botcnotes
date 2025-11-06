export function LeftPane({ players }: { players: string[] }) {
  const radius = 120; // px

  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2">
        Players
      </h2>

      {/* Kreis-Container */}
      <ul className="relative mx-auto size-72 rounded-full border-4 border-neutral-800 list-none p-0 m-0">
        {players.map((player, i) => {
          const angle = (360 / players.length) * i;
          return (
            <li
              key={player}
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
              {player}
            </li>
          );
        })}
      </ul>
    </div>
  );
}