// AppDB.ts
import Dexie, { type EntityTable } from "dexie"
import Player from "./Player"

export default class AppDB extends Dexie {
  friends!: EntityTable<Player, "id">

  constructor() {
    super("PlayersDB")
    this.version(1).stores({
      players: "++id, name, age",
    })
    this.friends.mapToClass(Player)
  }
}
