import { appDirectoryName, fileEncoding } from "../../src/shared/constants"
import { homedir } from "os"
import fs from "fs/promises"
import { ensureDir, readFile, stat, unlink, writeFile } from "fs-extra"
import { NoteInfo } from "../../src/shared/models"
import {
  DeleteNote,
  GetNotes,
  NewNote,
  ReadNote,
  WriteNote,
} from "../../src/shared/types"
import { dialog } from "electron"
import path from "path"

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  try {
    await ensureDir(rootDir)

    const notesFileNames = await fs.readdir(rootDir, {
      encoding: fileEncoding,
      withFileTypes: false,
    })

    const notes = notesFileNames.filter((fileName) => fileName.endsWith(".md"))

    return Promise.all(notes.map(getNoteInfoFromFileName))
  } catch (error) {
    console.error("Error getting notes:", error)
    return []
  }
}

export const getNoteInfoFromFileName = async (
  fileName: string,
): Promise<NoteInfo> => {
  try {
    const fileStat = await stat(`${getRootDir()}/${fileName}`)

    return {
      title: fileName.replace(".md", ""),
      lastEditTime: fileStat.mtimeMs,
    }
  } catch (error) {
    console.error(`Error getting file info for ${fileName}:`, error)
    // Return default info if stat fails
    return {
      title: fileName.replace(".md", ""),
      lastEditTime: Date.now(),
    }
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  try {
    return await readFile(`${rootDir}/${fileName}.md`, {
      encoding: fileEncoding,
    })
  } catch (error) {
    console.error(`Error reading note ${fileName}:`, error)
    // Return empty content if file doesn't exist
    return ""
  }
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()

  console.info("writeNote", fileName)

  return writeFile(`${rootDir}/${fileName}.md`, content, {
    encoding: fileEncoding,
  })
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()

  return unlink(`${rootDir}/${fileName}.md`)
}

export const newNote: NewNote = async () => {
  const rootDir = getRootDir()

  try {
    // Ensure the directory exists
    await ensureDir(rootDir)

    const { filePath, canceled } = await dialog.showSaveDialog({
      title: "New Note",
      defaultPath: `${rootDir}/Untitled.md`,
      buttonLabel: "Create",
      properties: ["showOverwriteConfirmation"],
      showsTagField: false,
      filters: [{ name: "Markdown", extensions: ["md"] }],
    })
    if (canceled || !filePath) return ""

    const { name: fileName, dir: parentDir } = path.parse(filePath)

    if (parentDir !== rootDir) {
      await dialog.showMessageBox({
        type: "error",
        title: "Error",
        message: "Please save the note in the app directory",
      })
      return ""
    }

    // Create the file with initial content
    await writeFile(`${parentDir}/${fileName}.md`, "", {
      encoding: fileEncoding,
    })

    return fileName
  } catch (error) {
    console.error(`Error creating note:`, error)
    return ""
  }
}
