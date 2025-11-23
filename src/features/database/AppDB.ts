// src/db/AppDB.ts
import Dexie, { type Table } from "dexie"
import type { Player } from "@/database/types/player"

export default class AppDB extends Dexie {
  players!: Table<Player, number>

  constructor() {
    super("BloodyNotesDB")

    this.version(1).stores({
      players: "id++, seat, name"
    })
  }
}

