// src/api/scriptApi.ts

const API_BASE_URL = ''; // Da wir direkt aus /public laden



/**
 * Holt die initiale Liste aller verfügbaren Skripte
 */
export async function fetchAvailableScripts() {
    try {
        // Corrected URL to point to the generated manifest file
        const response = await fetch(`${API_BASE_URL}/script-list.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Laden der Skript-Metadaten:", error);
        throw error;
    }
}

/**
 * Holt die vollständige JSON-Datei eines spezifischen Skripts.
 */
export async function fetchFullScript(scriptId: string) {
    try {
        // Mock-URL: /scripts/trouble_brewing.json aus dem /public Ordner
        const response = await fetch(`${API_BASE_URL}/scripts/${scriptId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fehler beim Laden des Skripts ${scriptId}:`, error);
        throw error;
    }
}