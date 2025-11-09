// Friend.ts
import { Entity } from "dexie"
import type AppDB from "./AppDB"

export default class Player extends Entity<AppDB> {
  id!: number
  name!: string
  age!: number

  // example method that access the DB:
  async birthday() {
    // this.db is inherited from Entity<AppDB>:
    await this.db.friends.update(this.id, (player) => ++player.age)
  }
}
