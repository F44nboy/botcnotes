import { Button } from "@/components/ui/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/shadcn/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select"

import { Textarea } from "@/components/ui/shadcn/textarea"
import { Controller, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


type NewGameSetupModalProps = {
  isSetupVisible: boolean;
  setIsSetupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const formSchema = z.object({
  script: z
    .string()
    .min(1, "Please select a Script."), // verhindert leere Auswahl
  players: z
    .string(),
})


const scripts = [
  { label: "Trouble Brewing", value: "tb" },
  { label: "Uncertain Death", value: "ud" },
  { label: "Pies Baking", value: "pb" },
  { label: "Silent Minority", value: "sm" },
  { label: "A new Beginning", value: "nb" },
  { label: "Gentle Night", value: "gt" },
  { label: "Bad Moon Rising", value: "bmr" },
] as const

//hier startet die componente
export function GameSetupForm({isSetupVisible, setIsSetupVisible}: NewGameSetupModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        script: "",
        players: "",
      },
    })
  

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form data:", data)
    setIsSetupVisible(false)
  }

  function closeModal() {
    setIsSetupVisible(!isSetupVisible);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
      onClick={closeModal} className={
        `fixed inset-0 flex items-center justify-center transition-colors 
        ${isSetupVisible ? ' bg-[rgba(20,15,30,0.3)] border-[#3A305B] pointer-events-auto' : 'bg-transparent pointer-events-none'
        }`}
        //bg-[rgba(57,50,82,0.3)]
      >
        <div onClick={(e) => e.stopPropagation()}
        className={
          //bg-[#1E1A2B]
          `shadow-lg min-w-100 transition-all
          ${isSetupVisible ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
          }`}
        >
          <Card className="w-full bg-[#000c] text-neutral-200">
            <CardHeader>
              <CardTitle>Grim setup</CardTitle>
                <CardDescription>
                    Lass uns dein BotC Spiel einrichten...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="new-game-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                      <Controller
                        name="script"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            orientation="responsive"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldContent>
                              <FieldLabel htmlFor="form-ngf-select-language" className="text-base">
                                Script Name
                              </FieldLabel>
                              <FieldDescription className="text-neutral-400">
                                Select your Blood on the Clocktower script.
                              </FieldDescription>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldContent>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="form-ngf-select-script"
                                aria-invalid={fieldState.invalid}
                                className="min-w-[120px]"
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper" className="bg-[rgba(30,25,40,0.6)] backdrop-blur-md text-neutral-200 border border-[#3A305B]">
                                <SelectItem value="auto">Select Script</SelectItem>
                                <SelectSeparator />
                                {scripts.map((script) => (
                                  <SelectItem key={script.value} value={script.value}>
                                    {script.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </Field>
                        )}
                      />
                      <Controller
                        name="players"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-ngf-textarea-about" className="text-base">
                              List of players
                            </FieldLabel>
                              <FieldDescription className="text-neutral-400">
                                List of players, in clockwise order,  as comma separated values.
                              </FieldDescription>
                            <Textarea
                              {...field}
                              id="form-ngf-textarea-players"
                              aria-invalid={fieldState.invalid}
                              placeholder="Milan, Alex, John, Sarah"
                              className="min-h-[120px]"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" form="new-game-form" className="w-full bg-[#9a61da] hover:bg-[#5d3077]">
                    Start Game
                  </Button>
                </CardFooter>
              </Card>
        </div>
    </div>
  )
}
