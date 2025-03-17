import type { ForecastResult, List } from '@/types/forecast'

export const getDailyWeatherInfo = (forecastArray: List[], timezone: number): ForecastResult[] => {
  const days: Record<string, { time: string; temperature: number; icon: string }[]> = {}

  forecastArray.forEach((item) => {
    const localTime = new Date((item.dt + timezone) * 1000)
    const date = localTime.toISOString().split('T')[0]
    const time = localTime.toISOString().split('T')[1].substring(0, 5)

    if (!days[date]) {
      days[date] = []
    }

    days[date].push({
      time,
      temperature: item.main.temp,
      icon: item.weather[0].icon,
    })
  })

  return Object.entries(days).map(([date, temperatures]) => ({ date, temperatures }))
}
