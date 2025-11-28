// src/db/AppDB.ts
import Dexie, { type Table } from "dexie"
import type { Player } from "@/features/database/types/player"
import type { Character } from "@/features/database/types/character"

export default class AppDB extends Dexie {
  players!: Table<Player, number>
  characters!: Table<Character, string>

  constructor() {
    super("BloodyNotesDB")

    this.version(3).stores({
      players: "id++, seat, name",
      characters: "&id"
    })
  }
}
