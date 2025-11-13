// import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
// import Editor from "@/components/ui/Editor";

import { PlayerList } from "../ui/players/PlayerList";

// src/components/layout/CenterPane.tsx
export function CenterPane() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <h2 className="text-center text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2 flex-none">
        Townsquare
      </h2>
      <div className="flex-1 min-h-0">
        <PlayerList />
      </div>
    </div>
  );
}