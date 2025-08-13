export const dateFormatter = new Intl.DateTimeFormat(
  window.ipcRenderer.locale,
  {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "UTC",
  },
)
export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)
