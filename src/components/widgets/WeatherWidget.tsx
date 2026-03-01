import { useState, useEffect } from 'react'
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import SettingsIcon from '@mui/icons-material/Settings'
import { WidgetCard } from '../WidgetCard'
import { WeatherSettingsDialog, type WeatherSettings } from '../dialogs/WeatherSettingsDialog'
import { fetchWeatherData, getWeatherDescription } from '../../utils/weather.api'
import type { WidgetSettings } from '../../types/widget.types'

type WeatherWidgetProps = {
  onRemove: () => void
  settings?: WidgetSettings & Partial<WeatherSettings>
  onSettingsChange?: (settings: WidgetSettings & Partial<WeatherSettings>) => void
}

export const WeatherWidget = ({ onRemove, settings, onSettingsChange }: WeatherWidgetProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [weatherData, setWeatherData] = useState<{
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
    weatherCode: number | null
    pressure: number | null
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const defaultTitle = 'Ho Chi Minh'
  const defaultSubtitle = 'Weather'

  const title = settings?.title ?? defaultTitle
  const subtitle = settings?.subtitle ?? defaultSubtitle
  const latitude = settings?.latitude ?? 10.8231 // Ho Chi Minh City
  const longitude = settings?.longitude ?? 106.6297

  // Fetch weather data
  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeatherData(latitude, longitude, {
          showTemperature: settings?.showTemperature ?? true,
          showHumidity: settings?.showHumidity ?? false,
          showWindSpeed: settings?.showWindSpeed ?? false,
          showWeatherCode: settings?.showWeatherCode ?? true,
          showPressure: settings?.showPressure ?? false,
        })
        setWeatherData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
    // Refresh every 10 minutes
    const interval = setInterval(loadWeather, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [latitude, longitude, settings?.showTemperature, settings?.showHumidity, settings?.showWindSpeed, settings?.showWeatherCode, settings?.showPressure])

  const settingsButton = onSettingsChange ? (
    <IconButton size="small" onClick={() => setSettingsOpen(true)} aria-label="Widget settings">
      <SettingsIcon fontSize="small" />
    </IconButton>
  ) : undefined

  const getWeatherIcon = (code: number | null) => {
    if (code === null) return <WbSunnyIcon sx={{ fontSize: 72, color: '#facc15' }} />
    // Simple icon mapping based on weather code
    if (code === 0) return <WbSunnyIcon sx={{ fontSize: 72, color: '#facc15' }} />
    if (code >= 1 && code <= 3) return <WbSunnyIcon sx={{ fontSize: 72, color: '#94a3b8' }} />
    if (code >= 45 && code <= 48) return <WbSunnyIcon sx={{ fontSize: 72, color: '#cbd5e1' }} />
    if (code >= 51 && code <= 67) return <WbSunnyIcon sx={{ fontSize: 72, color: '#60a5fa' }} />
    if (code >= 71 && code <= 77) return <WbSunnyIcon sx={{ fontSize: 72, color: '#e0e7ff' }} />
    if (code >= 80 && code <= 99) return <WbSunnyIcon sx={{ fontSize: 72, color: '#3b82f6' }} />
    return <WbSunnyIcon sx={{ fontSize: 72, color: '#facc15' }} />
  }

  return (
    <>
      <WidgetCard
        title={title}
        subtitle={subtitle}
        onRemove={onRemove}
        className="weather-card"
        settingsButton={settingsButton}
        textColor={settings?.textColor}
        textSize={settings?.textSize}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: 120 }}>
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        ) : (
          <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              {getWeatherIcon(weatherData?.weatherCode ?? null)}
            </Box>
            <Box>
              {settings?.showTemperature !== false && weatherData && weatherData.temperature !== null && (
                <Typography variant="h3" component="div">
                  {Math.round(weatherData.temperature)}°C
                </Typography>
              )}
              {settings?.showWeatherCode !== false && weatherData && weatherData.weatherCode !== null && (
                <Typography variant="h6" color="text.secondary">
                  {getWeatherDescription(weatherData.weatherCode)}
                </Typography>
              )}
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                {settings?.showHumidity && weatherData && weatherData.humidity !== null && (
                  <Typography variant="body2" color="text.secondary">
                    Humidity: {Math.round(weatherData.humidity)}%
                  </Typography>
                )}
                {settings?.showWindSpeed && weatherData && weatherData.windSpeed !== null && (
                  <Typography variant="body2" color="text.secondary">
                    Wind: {Math.round(weatherData.windSpeed)} km/h
                  </Typography>
                )}
                {settings?.showPressure && weatherData && weatherData.pressure !== null && (
                  <Typography variant="body2" color="text.secondary">
                    Pressure: {Math.round(weatherData.pressure)} hPa
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        )}
      </WidgetCard>
      {onSettingsChange && (
        <WeatherSettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={(settings ?? {}) as WeatherSettings}
          onSettingsChange={(newSettings) => onSettingsChange(newSettings as WidgetSettings & Partial<WeatherSettings>)}
          defaultTitle={defaultTitle}
          defaultSubtitle={defaultSubtitle}
        />
      )}
    </>
  )
}

