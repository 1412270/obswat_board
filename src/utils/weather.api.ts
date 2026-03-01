// Weather API utility for Open-Meteo
// Documentation: https://open-meteo.com/en/docs

export type WeatherData = {
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
    weatherCode: number | null
    pressure: number | null
    time: string | null
}

export type WeatherApiResponse = {
    current: {
        time: string
        temperature_2m: number
        relative_humidity_2m?: number
        wind_speed_10m?: number
        weather_code?: number
        sea_level_pressure?: number
    }
    current_units: {
        temperature_2m: string
        relative_humidity_2m?: string
        wind_speed_10m?: string
        weather_code?: string
        sea_level_pressure?: string
    }
}

const WEATHER_CODE_MAP: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
}

export const getWeatherDescription = (code: number | null): string => {
    if (code === null) return 'Unknown'
    return WEATHER_CODE_MAP[code] || 'Unknown'
}

export const fetchWeatherData = async (
    latitude: number,
    longitude: number,
    options: {
        showTemperature?: boolean
        showHumidity?: boolean
        showWindSpeed?: boolean
        showWeatherCode?: boolean
        showPressure?: boolean
    }
): Promise<WeatherData> => {
    // Build the current weather parameters based on what we want to display
    const currentParams: string[] = []
    if (options.showTemperature ?? true) currentParams.push('temperature_2m')
    if (options.showHumidity) currentParams.push('relative_humidity_2m')
    if (options.showWindSpeed) currentParams.push('wind_speed_10m')
    if (options.showWeatherCode ?? true) currentParams.push('weather_code')
    if (options.showPressure) currentParams.push('sea_level_pressure')

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', latitude.toString())
    url.searchParams.set('longitude', longitude.toString())
    url.searchParams.set('current', currentParams.join(','))
    url.searchParams.set('timezone', 'auto')

    try {
        const response = await fetch(url.toString())
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }

        const data: WeatherApiResponse = await response.json()

        return {
            temperature: data.current.temperature_2m ?? null,
            humidity: data.current.relative_humidity_2m ?? null,
            windSpeed: data.current.wind_speed_10m ?? null,
            weatherCode: data.current.weather_code ?? null,
            pressure: data.current.sea_level_pressure ?? null,
            time: data.current.time ?? null,
        }
    } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error
    }
}

