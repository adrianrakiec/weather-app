import { getDailyWeatherInfo, getDayNightTemperatures } from '@/helpers/dailyForecast'
import { describe, it, expect } from 'vitest'
import type { List } from '@/types/forecast'

describe('getDailyWeatherInfo', () => {
  it('should group weather data by date and convert time correctly', () => {
    const timezoneOffset = 0
    const mockData: List[] = [
      {
        dt: 1742310000,
        main: {
          temp: 10,
          feels_like: 10,
          grnd_level: 1000,
          humidity: 70,
          pressure: 1000,
          sea_level: 1000,
          temp_kf: 10,
          temp_max: 10,
          temp_min: 10,
        },
        weather: [{ icon: '01d', id: 1, description: 'overcast clouds', main: 'Clouds' }],
        dt_txt: '2025-03-18 15:00:00',
        clouds: { all: 80 },
        wind: { deg: 307, gust: 10, speed: 6 },
        visibility: 0,
        pop: 0,
        sys: { pod: 'd' },
      },
      {
        dt: 1742396400,
        main: {
          temp: 12,
          feels_like: 10,
          grnd_level: 1000,
          humidity: 70,
          pressure: 1000,
          sea_level: 1000,
          temp_kf: 10,
          temp_max: 10,
          temp_min: 10,
        },
        weather: [{ icon: '02d', id: 1, description: 'overcast clouds', main: 'Clouds' }],
        dt_txt: '2025-03-19 15:00:00',
        clouds: { all: 80 },
        wind: { deg: 307, gust: 10, speed: 6 },
        visibility: 0,
        pop: 0,
        sys: { pod: 'd' },
      },
      {
        dt: 1742320800,
        main: {
          temp: 5,
          feels_like: 10,
          grnd_level: 1000,
          humidity: 70,
          pressure: 1000,
          sea_level: 1000,
          temp_kf: 10,
          temp_max: 10,
          temp_min: 10,
        },
        weather: [{ icon: '03n', id: 1, description: 'overcast clouds', main: 'Clouds' }],
        dt_txt: '2025-03-18 18:00:00',
        clouds: { all: 80 },
        wind: { deg: 307, gust: 10, speed: 6 },
        visibility: 0,
        pop: 0,
        sys: { pod: 'd' },
      },
    ]

    const result = getDailyWeatherInfo(mockData, timezoneOffset)

    expect(result).toHaveLength(2)
    expect(result[0].date).toBe('2025-03-18')
    expect(result[0].temperatures).toHaveLength(2)
    expect(result[1].date).toBe('2025-03-19')
    expect(result[1].temperatures).toHaveLength(1)
  })
})

describe('getDayNightTemperatures', () => {
  it('should return correct day and night temperatures', () => {
    const mockTemps = [
      { time: '09:00', temperature: 14, icon: '01d' },
      { time: '12:00', temperature: 18, icon: '02d' },
      { time: '15:00', temperature: 20, icon: '02d' },
      { time: '21:00', temperature: 10, icon: '03n' },
      { time: '03:00', temperature: 6, icon: '04n' },
    ]

    const result = getDayNightTemperatures(mockTemps)

    expect(result).toBe('20° / 6°')
  })
})
