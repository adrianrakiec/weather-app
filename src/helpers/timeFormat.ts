export const timeFormat = (timeInSec: number) => {
  return new Date(timeInSec * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getDayName = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}
