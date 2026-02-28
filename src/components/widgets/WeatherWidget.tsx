import { Box, Stack, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { WidgetCard } from '../WidgetCard'

type WeatherWidgetProps = {
  onRemove: () => void
}

export const WeatherWidget = ({ onRemove }: WeatherWidgetProps) => {
  return (
    <WidgetCard
      title="Ho Chi Minh"
      subtitle="Weather"
      onRemove={onRemove}
      className="weather-card"
    >
      <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <WbSunnyIcon sx={{ fontSize: 72, color: '#facc15' }} />
        </Box>
        <Box>
          <Typography variant="h3" component="div">
            36°C
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Sunny
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Perfect weather to be productive.
          </Typography>
        </Box>
      </Stack>
    </WidgetCard>
  )
}

