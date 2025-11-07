import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function NewGameSetup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-[#1E1A2B] rounded-lg shadow-lg min-w-200">
            {/* Inhalt */}
            <InputGroup>
                <InputGroupTextarea
                id="textarea-code-32"
                placeholder="console.log('Hello, world!');"
                className="min-h-[200px]"
                />
                <InputGroupAddon align="block-end" className="border-t">
                <InputGroupText>Line 1, Column 1</InputGroupText>
                <InputGroupButton size="sm" className="ml-auto" variant="default">
                    Run
                </InputGroupButton>
                </InputGroupAddon>
                <InputGroupAddon align="block-start" className="border-b">
                <InputGroupText className="font-mono font-medium">
                    script.js
                </InputGroupText>
                <InputGroupButton className="ml-auto" size="icon-xs">
                </InputGroupButton>
                <InputGroupButton variant="ghost" size="icon-xs">
                </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    </div>
  )
}
