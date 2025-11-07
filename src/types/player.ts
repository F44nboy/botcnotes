export type Player = {
  id: number;        // stabiler Schlüssel (z. B. von Extension/UUID), initial identisch mit seat.
  seat: number;      // Sitzplatz (1..n), definiert die Reihenfolge im Kreis
  name: string;      // Anzeigename
  alignment?: string; // z. B. "Loyalist", "Rebel", "Neutral"
  character?: string; // z. B. "Empath, Chef, Slayer"
  drunk?: boolean;    // betrunken-Status
  poisoned?: boolean; // vergiftet-Status
  alive?: boolean;   // optional: Lebensstatus (Standard: true)
  bluff?: string;     // optional: Bluff des Spielers
  hardclaim?: string; // optional: Hardclaim des Spielers
  notes?: string;    // optional: freie Notizen
};

 
          
           