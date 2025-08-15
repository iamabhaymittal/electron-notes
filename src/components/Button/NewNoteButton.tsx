import { ActionButton, ActionButtonProps } from "@/components"
import { LucideFileSignature } from "lucide-react"
import { createEmptyNoteAtom } from "@/store"
import { useSetAtom } from "jotai"

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = () => {
    createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handleCreation}>
      <LucideFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
