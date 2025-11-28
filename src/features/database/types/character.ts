export type Character = {
    id: string; 
    name: string; 
    ability: string;
    team: 'townsfolk' | 'outsider' | 'minion' | 'demon' | 'traveler';
    image: string;
    edition: string;
    firstNight: number;
    firstNightReminder: string;
    otherNight: number;
    otherNightReminder: string;
    reminders: string[];
    remindersGlobal?: string[]; 
    setup: boolean;
};