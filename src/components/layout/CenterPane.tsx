// import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
// import Editor from "@/components/ui/Editor";

// src/components/layout/CenterPane.tsx
export function CenterPane() {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide uppercase text-neutral-200 mb-2">
        Player Context
      </h2>
      <div>
        <textarea name="postContent" className="bg-white text-black " />
      </div>
    </div>
  );
}