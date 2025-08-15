import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"
import { useNotesList } from "@/hooks/useNotesList"
import { isEmpty } from "lodash"

export type NotePreviewListProps = ComponentProps<"ul"> & {
  onSelect?: () => void
}

export const NotePreviewList = ({
  onSelect,
  className,
  ...props
}: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({
    onSelect,
  })

  if (isEmpty(notes)) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes?.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          {...note}
          onClick={handleNoteSelect(index)}
        />
      ))}
    </ul>
  )
}
