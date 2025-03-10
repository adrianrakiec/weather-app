export const timeFormat = (timeInSec: number) => {
  return new Date(timeInSec * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}
