import { notesAtom, selectedNoteIndexAtom } from "@/store"
import { useAtom, useAtomValue } from "jotai"

export const useNotesList = ({
  onSelect,
}: {
  onSelect?: (index: number) => void
}) => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(
    selectedNoteIndexAtom,
  )

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect(index)
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect,
  }
}
