import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { WidgetSettings } from '../../types/widget.types'

export type WeatherSettings = WidgetSettings & {
  latitude?: number
  longitude?: number
  showTemperature?: boolean
  showHumidity?: boolean
  showWindSpeed?: boolean
  showWeatherCode?: boolean
  showPressure?: boolean
}

type WeatherSettingsDialogProps = {
  open: boolean
  onClose: () => void
  settings: WeatherSettings
  onSettingsChange: (settings: WeatherSettings) => void
  defaultTitle: string
  defaultSubtitle?: string
}

export const WeatherSettingsDialog = ({
  open,
  onClose,
  settings,
  onSettingsChange,
  defaultTitle,
  defaultSubtitle,
}: WeatherSettingsDialogProps) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, title: event.target.value || undefined })
  }

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, subtitle: event.target.value || undefined })
  }

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    onSettingsChange({ ...settings, latitude: isNaN(value) ? undefined : value })
  }

  const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    onSettingsChange({ ...settings, longitude: isNaN(value) ? undefined : value })
  }

  const handleDisplayOptionChange = (key: keyof WeatherSettings, checked: boolean) => {
    onSettingsChange({ ...settings, [key]: checked })
  }

  const currentTitle = settings.title ?? defaultTitle
  const currentSubtitle = settings.subtitle ?? defaultSubtitle ?? ''
  const currentLatitude = settings.latitude ?? 10.8231 // Default: Ho Chi Minh City
  const currentLongitude = settings.longitude ?? 106.6297

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Weather Settings</Typography>
        <IconButton onClick={onClose} aria-label="Close settings dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Panel Name */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Panel Name
            </Typography>
            <TextField
              fullWidth
              value={currentTitle}
              onChange={handleTitleChange}
              placeholder={defaultTitle}
              variant="outlined"
              size="small"
            />
          </Box>

          {/* Subtitle */}
          {defaultSubtitle && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
                Subtitle
              </Typography>
              <TextField
                fullWidth
                value={currentSubtitle}
                onChange={handleSubtitleChange}
                placeholder={defaultSubtitle}
                variant="outlined"
                size="small"
              />
            </Box>
          )}

          {/* Location */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Location (Coordinates)
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Latitude"
                type="number"
                value={currentLatitude}
                onChange={handleLatitudeChange}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ step: '0.0001', min: -90, max: 90 }}
              />
              <TextField
                label="Longitude"
                type="number"
                value={currentLongitude}
                onChange={handleLongitudeChange}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ step: '0.0001', min: -180, max: 180 }}
              />
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Default: Ho Chi Minh City (10.8231°N, 106.6297°E)
            </Typography>
          </Box>

          {/* Display Options */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Display Options
            </Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.showTemperature ?? true}
                    onChange={(e) => handleDisplayOptionChange('showTemperature', e.target.checked)}
                  />
                }
                label="Temperature"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.showHumidity ?? false}
                    onChange={(e) => handleDisplayOptionChange('showHumidity', e.target.checked)}
                  />
                }
                label="Relative Humidity"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.showWindSpeed ?? false}
                    onChange={(e) => handleDisplayOptionChange('showWindSpeed', e.target.checked)}
                  />
                }
                label="Wind Speed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.showWeatherCode ?? true}
                    onChange={(e) => handleDisplayOptionChange('showWeatherCode', e.target.checked)}
                  />
                }
                label="Weather Condition"
              />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

