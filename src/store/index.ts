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

// Helper function to generate unique note titles
const generateUniqueTitle = (existingNotes: NoteInfo[]): string => {
  // Extract all numbers from existing note titles
  const existingNumbers = existingNotes
    .map((note) => {
      const match = note.title.match(/^Note-(\d+)$/)
      return match ? parseInt(match[1], 10) : 0
    })
    .filter((num) => num > 0)
    .sort((a, b) => a - b)

  // Find the first available number (starting from 1)
  let counter = 1
  for (const existingNum of existingNumbers) {
    if (existingNum !== counter) {
      // Found a gap, use this number
      return `Note-${counter}`
    }
    counter++
  }

  // No gaps found, use the next number after the highest existing number
  return `Note-${counter}`
}

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

  try {
    // Create the note file first
    const title = await window.context.newNote()

    // Only update the UI after successful file creation
    set(notesAtom, [
      { title, lastEditTime: Date.now() },
      ...notes.filter((note) => note.title !== title),
    ])
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
