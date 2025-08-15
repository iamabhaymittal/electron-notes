export const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC",
})
export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)
