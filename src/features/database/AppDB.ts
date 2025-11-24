// src/db/AppDB.ts
import Dexie, { type Table } from "dexie"
import type { Player } from "@/features/database/types/player"
import type { Script } from "@/features/database/types/script"

export default class AppDB extends Dexie {
  players!: Table<Player, number>
  scripts!: Table<Script, string>

  constructor() {
    super("BloodyNotesDB")

    this.version(2).stores({
      players: "id++, seat, name",
      scripts: "&id" // 'id' ist der Primärschlüssel (der Skriptname)
    })
  }
}
