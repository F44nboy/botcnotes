import { db } from "./db";
import type { Player } from "./types/player";



export async function savePlayers(player: Player[]){
    await db.players.bulkAdd(player)
}

export async function getAllPlayers(){
    const players: Player[] = await db.players.toArray()
    return players ;
}