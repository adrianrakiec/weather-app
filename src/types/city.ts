export type CityInfo = {
  name: string
  local_names?: []
  lat: number
  lon: number
  country: string
  state: string
}

export type CityWeather = {
  icon: string
  temperature: number
  sunrise: number
  sunset: number
  name: string
}
