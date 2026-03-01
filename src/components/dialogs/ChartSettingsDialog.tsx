import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import BarChartIcon from '@mui/icons-material/BarChart'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export type ChartType = 'line' | 'bar' | 'area'
export type ChartStyle = {
  color: string
  strokeWidth: number
}

type ChartSettingsDialogProps = {
  open: boolean
  onClose: () => void
  chartType: ChartType
  chartStyle: ChartStyle
  onChartTypeChange: (type: ChartType) => void
  onChartStyleChange: (style: ChartStyle) => void
}

const chartTypeOptions: { value: ChartType; label: string; icon: React.ReactNode }[] = [
  { value: 'line', label: 'Line Chart', icon: <ShowChartIcon /> },
  { value: 'bar', label: 'Bar Chart', icon: <BarChartIcon /> },
  { value: 'area', label: 'Area Chart', icon: <TrendingUpIcon /> },
]

const colorOptions = [
  { value: '#0066cc', label: 'Opswat Blue' },
  { value: '#00a8e8', label: 'Cyan' },
  { value: '#0073e6', label: 'Light Blue' },
  { value: '#22c55e', label: 'Green' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#ec4899', label: 'Pink' },
]

export const ChartSettingsDialog = ({
  open,
  onClose,
  chartType,
  chartStyle,
  onChartTypeChange,
  onChartStyleChange,
}: ChartSettingsDialogProps) => {
  const handleColorChange = (color: string) => {
    onChartStyleChange({ ...chartStyle, color })
  }

  const handleStrokeWidthChange = (_event: Event, value: number | number[]) => {
    onChartStyleChange({ ...chartStyle, strokeWidth: value as number })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Chart Settings</Typography>
        <IconButton onClick={onClose} aria-label="Close settings dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Chart Type Selection */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Chart Type
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={chartType}
                onChange={(e) => onChartTypeChange(e.target.value as ChartType)}
                sx={{ gap: 1 }}
              >
                {chartTypeOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.icon}
                        <Typography>{option.label}</Typography>
                      </Box>
                    }
                    sx={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      m: 0,
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Color Selection */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Color
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
                    border: chartStyle.color === color.value ? '3px solid #000' : '2px solid #e5e7eb',
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

          {/* Stroke Width */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Line Width
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={chartStyle.strokeWidth}
                onChange={handleStrokeWidthChange}
                min={1}
                max={5}
                step={1}
                marks
                valueLabelDisplay="auto"
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

