import { db } from "./db";
import type { Player } from "./types/player";



export async function savePlayersToDB(player: Player[]){
    await db.players.bulkAdd(player)
}

export async function getAllPlayersFromDB(){
    const players: Player[] = await db.players.toArray()
    return players ;
}

export async function deletePlayersFromDB(){
    await db.delete()
}