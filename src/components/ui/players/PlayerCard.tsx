// ================================
// FILE: src/components/ui/players/PlayerCard.tsx
// Placeholder; kept for potential future use.
// ================================

import { usePlayers } from "@/features/state/players-context";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import type { Player } from "@/database/types/player";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia } from "../shadcn/item";
import { Button } from "../shadcn/button";
import { PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../shadcn/dropdown-menu";
import { useState } from "react";

type PlayerCardProps = {
  seatNumber: number;
  playerCardRef: React.RefObject<HTMLDivElement | null>;
  dropdownRef?: React.RefObject<HTMLDivElement | null>;
};
export function PlayerCard({seatNumber, playerCardRef, dropdownRef}: PlayerCardProps) {
  const { players } = usePlayers();
  const player: Player | undefined = players.find(p => p.seat === seatNumber);
  const [position, setPosition] = useState("bottom")

  if (!player) return null;
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <Card ref={playerCardRef} className="min-w-50 max-w-[420px] sm:max-w-[480px] md:max-w-[540px] bg-[#000c] text-neutral-200">
        <CardHeader>
          <CardTitle className="">
            <span className="text-purple-400 mr-2">
              Seat {player.seat}:
            </span>
            <span>  
              {player.name}
            </span>
          </CardTitle>
        </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-md flex-col p-0">
              <ItemGroup>
                <Item className="p-0">
                  <ItemMedia>
                    <div
                      className="
                        relative
                        flex items-center justify-center
                        w-[60px] h-[60px]
                        bg-[url('/token-background.webp')]
                        bg-size-[113%]
                        bg-center
                        bg-no-repeat
                        rounded-full
                      "
                    >
                      <span
                        className="
                          absolute inset-0
                          z-10
                          bg-[url(/icons/Townsfolk/Icon_fortuneteller.png)]
                          bg-center bg-cover
                        "
                      />
                    </div>
                  </ItemMedia>
                  <ItemContent>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="
                            px-3 py-2 
                            rounded-md 
                            border border-neutral-700
                            bg-neutral-900
                            text-neutral-200
                            transition
                            hover:bg-neutral-800
                            focus:outline-none
                            focus:ring-2 focus:ring-purple-600
                          "
                        >
                          {player.character ?? "Choose Character..."}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent ref={dropdownRef} className="w-56">
                        <DropdownMenuLabel>Choose a Character from the list...</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                          <DropdownMenuRadioItem value="top">Virgin</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bottom">Imp</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="right">Spy</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ItemContent>
                </Item>
              </ItemGroup>
            </div>
            <ItemActions>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <PlusIcon />
                    </Button>
            </ItemActions>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
      </Card>
    </div>
  )
}
