// src/state/players-context.ts
import { createContext, useContext } from "react";
import type { Player } from "@/database/types/player";

export type PlayersContextValue = {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  resetPlayers: (players: Player[]) => void;
};

export const PlayersContext = createContext<PlayersContextValue | undefined>(
  undefined,
);

export function usePlayers() {
  const ctx = useContext(PlayersContext);
  if (!ctx) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return ctx;
}
