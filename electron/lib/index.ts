import { appDirectoryName, fileEncoding } from "../../src/shared/constants"
import { homedir } from "os"
import fs from "fs/promises"
import { ensureDir, readFile, stat, writeFile } from "fs-extra"
import { NoteInfo } from "../../src/shared/models"
import { GetNotes, ReadNote, WriteNote } from "../../src/shared/types"

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await fs.readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false,
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith(".md"))

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (
  fileName: string,
): Promise<NoteInfo> => {
  const fileStat = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(".md", ""),
    lastEditTime: fileStat.mtimeMs,
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${fileName}.md`, {
    encoding: fileEncoding,
  })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()

  console.info("writeNote", fileName, content)

  return writeFile(`${rootDir}/${fileName}.md`, content, {
    encoding: fileEncoding,
  })
}
