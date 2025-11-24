// ================================
// FILE: src/components/ui/players/PlayerCard.tsx
// Placeholder; kept for potential future use.
// ================================

import { usePlayers } from "@/features/state/players-context";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import type { Player } from "@/features/database/types/player";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "../shadcn/item";
import { Button } from "../shadcn/button";
import { PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../shadcn/dropdown-menu";
import { useState } from "react";
import { Badge } from "../shadcn/badge";
import { Separator } from "../shadcn/separator";
import { Textarea } from "../shadcn/textarea";

type PlayerCardProps = {
  seatNumber: number;
  playerCardRef: React.RefObject<HTMLDivElement | null>;
  dropdownRef?: React.RefObject<HTMLDivElement | null>;
  setPlayerCardSeatNumber: (visible: number | null) => void;
};
export function PlayerCard({setPlayerCardSeatNumber, seatNumber, playerCardRef, dropdownRef}: PlayerCardProps) {
  const { players } = usePlayers();
  const player: Player | undefined = players.find(p => p.seat === seatNumber);
  const [position, setPosition] = useState("bottom")

  function onClosePlayerCardClick() {
    setPlayerCardSeatNumber(null);
  }

  if (!player) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Card ref={playerCardRef} className="max-w-[420px] sm:max-w-[480px] md:max-w-[540px] bg-[#000c] text-neutral-200">
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
                          bg-[url(/icons/townsfolk/Icon_fortuneteller.png)]
                          bg-center bg-cover
                        "
                      />
                      <svg
                        className="absolute inset-0 z-20 pointer-events-none"
                        viewBox="0 0 140 140"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                      >
                        <defs>
                          {/* Unterer Halbkreis: Mittelpunkt (70,70), Radius 60 → Pfad: links unten → rechts unten */}
                          <path id="circle-path-bottom" d="M 10,70 A 60 60 0 0 0 130,70" />
                        </defs>
                        <text
                          textAnchor="middle"
                          fontFamily="Dumbledor, serif"
                          fontSize="120%"
                          style={{
                            textTransform: "uppercase",
                            paintOrder: "stroke",
                            letterSpacing: "2px",
                          }}
                        >
                          <textPath
                            href="#circle-path-bottom"
                            startOffset="50%"
                            spacing="auto"
                            method="align"
                          >
                            Fortune Teller
                          </textPath>
                        </text>
                      </svg>
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
                            focus:ring-2 focus:ring-purple-600"
                        >
                          {player.character ?? "Choose Character..."}
                        </button>

                      </DropdownMenuTrigger>
                      <DropdownMenuContent ref={dropdownRef} className="w-56">
                        <DropdownMenuLabel>Trouble Brewing</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                          <DropdownMenuRadioItem value="top">Virgin</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bottom">Ravenkeeper</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="right">Fortune Teller</DropdownMenuRadioItem>                         
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                          <DropdownMenuRadioItem value="top">Baron</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bottom">Scarlet Woman</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="right">Spy</DropdownMenuRadioItem>                         
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                          <DropdownMenuRadioItem value="top">Imp</DropdownMenuRadioItem>             
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ItemContent>
                </Item>
                <Item className="px-0 pt-5">
                  <ItemContent>
                    <div className="flex flex-wrap items-center gap-2 max-w-70">
                        <Button
                          variant="ghost" // Entfernt Hintergrund und Rahmen
                          className="h-auto p-0 cursor-pointer" // Passt die Größe an den Inhalt an (das Badge)
                          aria-label={`Attribut entfernen`}
                        >
                          <Badge variant="destructive" className="pointer-events-none">
                            Evil
                          </Badge>
                        </Button>
                        <Button
                          variant="ghost" // Entfernt Hintergrund und Rahmen
                          className="h-auto p-0 cursor-pointer" // Passt die Größe an den Inhalt an (das Badge)
                          aria-label={`Attribut entfernen`}
                        >
                          <Badge variant="destructive" className="pointer-events-none">
                            Minion
                          </Badge>
                        </Button>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="destructive" size="icon" className="rounded-full">
                      <PlusIcon />
                    </Button>
                  </ItemActions>
                </Item>
            </div>
            <Separator />
            <Item>
              <ItemContent>
                <ItemTitle className="pb-2">Notes</ItemTitle>
                <Textarea placeholder="Type your message here." id="message" />
              </ItemContent>
            </Item>
          </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button
            onClick={onClosePlayerCardClick}
            className="
              px-3 py-2 
              rounded-md 
              border border-neutral-700
              bg-neutral-900
              text-neutral-200
              transition
              hover:bg-neutral-800
              focus:outline-none
              focus:ring-2
            "
            variant="outline"
            type="button"
          >
            Schließen
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
