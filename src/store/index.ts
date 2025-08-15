import { atom } from "jotai"
import { NoteContent, NoteInfo } from "@/shared/models"
import { unwrap } from "jotai/utils"

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex === null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  try {
    const noteContent = await window.context.readNote(selectedNote.title)
    return {
      ...selectedNote,
      content: noteContent || "",
    }
  } catch (error) {
    console.error("Error reading note:", error)
    // Return the note with empty content if reading fails
    return {
      ...selectedNote,
      content: "",
    }
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: "",
      content: "",
      lastEditTime: Date.now(),
    },
)

export const saveNoteAtom = atom(
  null,
  async (get, set, newContent: NoteContent) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) return

    // save on disk
    await window.context.writeNote(selectedNote.title, newContent)

    // update the saved note's last edit time
    set(
      notesAtom,
      notes.map((note) => {
        // this is the note that we want to update
        if (note.title === selectedNote.title) {
          return {
            ...note,
            lastEditTime: Date.now(),
          }
        }

        return note
      }),
    )
  },
)

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return
  const title = `Note-${notes.length + 1}`
  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now(),
  }

  try {
    // Create the note file first
    await window.context.newNote(title)

    // Only update the UI after successful file creation
    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== title)])
    set(selectedNoteIndexAtom, 0)
  } catch (error) {
    console.error("Failed to create new note:", error)
    // Don't update the UI if file creation failed
  }
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (selectedNote === null || !notes) return

  await window.context.deleteNote(selectedNote.title)

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title),
  )

  set(selectedNoteIndexAtom, null)
})
