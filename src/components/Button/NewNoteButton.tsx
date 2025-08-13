import { ActionButton, ActionButtonProps } from "@/components"
import { LucideFileSignature } from "lucide-react"

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LucideFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
