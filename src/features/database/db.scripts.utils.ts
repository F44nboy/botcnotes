import { fetchFullScript } from "../api/scriptApi";
import { db } from "./db";
import type { Character } from "./types/character";

export async function saveScripttoDB(scriptId: string) {
    const fullScript = await fetchFullScript(scriptId);
    await db.characters.bulkAdd(fullScript)
}

//Prototyp funktionen von KI generiert in zukunft verfeinern
export async function getCharacterById(characterId: string): Promise<Character | undefined> {
    try {
        // 'get' liefert undefined zurück, wenn der Schlüssel nicht existiert.
        const character = await db.characters.get(characterId);
        return character;
    } catch (error) {
        console.error(`DB Fehler beim Abrufen von Charakter '${characterId}':`, error);
        return undefined;
    }
}

export async function getAllCharacters(): Promise<Character[]> {
    try {
        const allCharacters = await db.characters.toArray();
        return allCharacters;
    } catch (error) {
        console.error("DB Fehler beim Abrufen aller Charaktere:", error);
        return [];
    }
}