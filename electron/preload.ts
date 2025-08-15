import { ipcRenderer, contextBridge } from "electron"
import { GetNotes, ReadNote, WriteNote } from "@/shared/types"

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("context", {
  locale: navigator.language,
  getNotes: (...args: Parameters<GetNotes>) =>
    ipcRenderer.invoke("getNotes", ...args),
  readNote: (...args: Parameters<ReadNote>) =>
    ipcRenderer.invoke("readNote", ...args),
  writeNote: (...args: Parameters<WriteNote>) =>
    ipcRenderer.invoke("writeNote", ...args),
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
