import { db } from "./db";
import type { Player } from "./types/player";

export function parsePlayers(input: string){

    const dbplayers = input.split(",")
    .map(name => name.trim())
    .filter(name => name.length > 0)
    .map((name, index) => ({
      id: index + 1,
      seat: index + 1,
      name,
      alive: true,
    }));
    db.players.bulkAdd(dbplayers)
    console.log(db.players.toArray())
}

export async function getAllPlayers(){
    const players: Player[] = await db.players.toArray()
    return players ;
}