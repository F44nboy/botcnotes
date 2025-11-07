# Informationsmodell
* Zeitliche Zuordnung von Informationen. Es ist wichtig, wann eine Information entsteht. Daher sollte es eine Timeline geben, in der alle Informationen gesammelt werden
    * Es muss eine automatische Zuordnung von Informationen zum Zeitpunkt im Spiel stattfinden. Dh. der Spielverlauf muss in der App simuliert werden. Wenn ich während Tag Eins eine Notiz schreibe, muss diese automatisch in der Timeline bei Tag 1 angezeigt werden.
    * Vllt kann man informationen in panels optisch direkt einem tag zuordnen vllt ein Farbcode
    * Mögliches Objekt: 
        ``` 
        timeline {
            night: {
                1: {},
                2: {},
            }
            day:{
                1: {},
                2: {},
            }
        }
* Spielerbezogen: xyz hat gesagt, xyz hat gehandelt
    * Spielerobjekt:
        ``` 
        player {
            id/platz: int,
            name: string, 
            alignment: string,
            character/role: string,
            drunk: bool,
            poisoned: bool,
            custom note?: string,
            alive: bool,
            bluffs: string
            hardclaim gegeben: bool
        }
        erstgespräche {
            tag des gespräches: int
            (das wievielte gespräch): int
            hardclaim_erhalten: string
            hardclaim_gegeben: string
            bluffs_erhalten: string
            bluffs_gegeben: string
        }
    * Es sollte ein Pop-Up geben, dass sich öffnet, wenn man über den Spieler hovert/klickt. Dort taucht dann ein Menü auf, welches es einem ermöglicht Informationen, die sich speziell auf diesen Spieler beziehen einzutragen.
* Rollenbezogen, nicht unbedingt mit einem Spieler verknüpft: FT Pings, Chef zahl etc.
    * Es muss einen Weg geben diese Informationen zentralisiert zu notieren, damit es parallel zum Spielgeschehen passieren kann und dann müssen die Informationen dem passenden Zeitpunkt in der Timeline zugeordnet werden können.
* Townsquare Informationen
    ```
    voting {
        voting_target: string
        voter: string[]
    }
    nominations {
        nominator: string
        nominee: string
    }
    tode {
        opfer_name: string,
        todeszeitpunkt: string,
        executioner: string
    }
* Allgemeine Informationen. Spieler sollten in der Lage sein sich alle Notizen machen zu können, die sie wollen