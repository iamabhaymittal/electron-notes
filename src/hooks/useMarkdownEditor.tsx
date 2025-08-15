import { NoteContent } from "@/shared/models"
import { saveNoteAtom, selectedNoteAtom } from "@/store"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react"
import { throttle } from "lodash"
import { autoSaveInterval } from "@/shared/constants"

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info("Auto saving", selectedNote.title, content)

      await saveNote(content)
    },
    autoSaveInterval,
    { trailing: true, leading: false },
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    console.info("Saving on blur", selectedNote.title)
    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }
  }

  return {
    selectedNote,
    editorRef,
    handleAutoSaving,
    handleBlur,
  }
}
