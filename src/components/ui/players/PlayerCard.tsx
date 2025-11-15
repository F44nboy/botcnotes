// ================================
// FILE: src/components/ui/players/PlayerCard.tsx
// Placeholder; kept for potential future use.
// ================================

import { Button } from "../shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import type { Player } from "@/database/types/player";

type PlayerCardProps = {
  player: Player;
};
export function PlayerCard({player}: PlayerCardProps) {
  return (
    <Card className="w-full bg-[#000c] text-neutral-200 z-100 absolute min-w-100">
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
          <CardDescription>
              idk what to put here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Ich bin eine Karte</p>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" form="new-game-form" className="w-full bg-[#9a61da] hover:bg-[#5d3077]">
              Start Game
            </Button>
          </CardFooter>
    </Card>
  )
}
