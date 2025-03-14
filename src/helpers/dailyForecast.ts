import type { DailyWeather } from '@/types/dailyWeather'
import type { List } from '@/types/forecast'

export const getDailyWeatherInfo = (list: List[]): DailyWeather[] => {
    const dailyTemperatures: { [key: string]: { tempDay: number; tempNight: number, icon: string } } = {}

    list.forEach((item) => {
      const dateString = item.dt_txt.split(' ')[0]

      if (item.dt_txt.includes('12:00:00')) {
        dailyTemperatures[dateString] = {
          ...dailyTemperatures[dateString],
          tempDay: item.main.temp,
          icon: item.weather[0].icon
        }
      }

      if (item.dt_txt.includes('21:00:00')) {
        dailyTemperatures[dateString] = {
          ...dailyTemperatures[dateString],
          tempNight: item.main.temp,
        }
      }
    })

    return Object.keys(dailyTemperatures).map((date) => ({
      date,
      icon: dailyTemperatures[date].icon,
      tempDay: dailyTemperatures[date].tempDay,
      tempNight: dailyTemperatures[date].tempNight,
    }))
  }
