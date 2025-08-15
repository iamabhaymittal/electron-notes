"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("context", {
  locale: navigator.language,
  getNotes: (...args) => electron.ipcRenderer.invoke("getNotes", ...args),
  readNote: (...args) => electron.ipcRenderer.invoke("readNote", ...args),
  writeNote: (...args) => electron.ipcRenderer.invoke("writeNote", ...args),
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
