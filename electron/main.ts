import { app, BrowserWindow, ipcMain } from "electron"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { getNotes, readNote, writeNote } from "./lib"
import { GetNotes, ReadNote, WriteNote } from "@/shared/types"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, "..")

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron")
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist")

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  const iconPath = process.env.VITE_PUBLIC
    ? path.join(process.env.VITE_PUBLIC, "electron-vite.svg")
    : "" // Provide a default value or handle the undefined case
  win = new BrowserWindow({
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    center: true,
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    title: "NoteMark",
    vibrancy: "under-window",
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 15,
      y: 10,
    },
    frame: false, // Enable the frame to allow window dragging
    // transparent: true, // Disable transparency to ensure the title bar is visible
    hasShadow: true,
    resizable: true,
    movable: true,
  })

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"))
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
    win = null
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  ipcMain.handle("getNotes", (_, ...args: Parameters<GetNotes>) =>
    getNotes(...args),
  )
  ipcMain.handle("readNote", (_, ...args: Parameters<ReadNote>) =>
    readNote(...args),
  )
  ipcMain.handle("writeNote", (_, ...args: Parameters<WriteNote>) =>
    writeNote(...args),
  )
  createWindow()
})

ipcMain.on("ping", () => {
  console.log("pong")

  return {
    message: "pong",
  }
})
