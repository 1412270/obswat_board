import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { WidgetSettings } from '../../types/widget.types'

export type TimeRange = 'today' | 'week' | 'month' | 'year'

export type CounterRevenueSettings = WidgetSettings & {
  timeRange?: TimeRange
}

type CounterRevenueSettingsDialogProps = {
  open: boolean
  onClose: () => void
  settings: CounterRevenueSettings
  onSettingsChange: (settings: CounterRevenueSettings) => void
  defaultTitle: string
  defaultSubtitle?: string
}

const colorOptions = [
  { value: '#1f2937', label: 'Dark Gray' },
  { value: '#4f46e5', label: 'Indigo' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#22c55e', label: 'Green' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ef4444', label: 'Red' },
]

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
]

export const CounterRevenueSettingsDialog = ({
  open,
  onClose,
  settings,
  onSettingsChange,
  defaultTitle,
  defaultSubtitle,
}: CounterRevenueSettingsDialogProps) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, title: event.target.value || undefined })
  }

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, subtitle: event.target.value || undefined })
  }

  const handleColorChange = (color: string) => {
    onSettingsChange({ ...settings, textColor: color })
  }

  const handleTextSizeChange = (_event: Event, value: number | number[]) => {
    onSettingsChange({ ...settings, textSize: value as number })
  }

  const handleTimeRangeChange = (event: { target: { value: unknown } }) => {
    onSettingsChange({ ...settings, timeRange: event.target.value as TimeRange })
  }

  const currentTitle = settings.title ?? defaultTitle
  const currentSubtitle = settings.subtitle ?? defaultSubtitle ?? ''
  const currentTextColor = settings.textColor ?? '#1f2937'
  const currentTextSize = settings.textSize ?? 1
  const currentTimeRange = settings.timeRange ?? 'today'

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Widget Settings</Typography>
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

          {/* Time Range */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Time Range
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Time Range</InputLabel>
              <Select
                value={currentTimeRange}
                label="Time Range"
                onChange={handleTimeRangeChange}
              >
                {timeRangeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Text Color */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Text Color
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {colorOptions.map((color) => (
                <Box
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: color.value,
                    cursor: 'pointer',
                    border: currentTextColor === color.value ? '3px solid #000' : '2px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                  }}
                  title={color.label}
                />
              ))}
            </Box>
          </Box>

          {/* Text Size */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
              Text Size
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={currentTextSize}
                onChange={handleTextSizeChange}
                min={0.75}
                max={1.5}
                step={0.05}
                marks={[
                  { value: 0.75, label: 'Small' },
                  { value: 1, label: 'Normal' },
                  { value: 1.5, label: 'Large' },
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                sx={{ mt: 1 }}
              />
            </Box>
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

