import { db } from "./db";

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