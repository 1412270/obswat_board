import { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { WidgetCard } from '../WidgetCard'

type ClockWidgetProps = {
  onRemove: () => void
}

export const ClockWidget = ({ onRemove }: ClockWidgetProps) => {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const date = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <WidgetCard title={time} subtitle="Current Time" onRemove={onRemove}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: '#e0e7ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AccessTimeIcon sx={{ color: '#4f46e5' }} />
        </Box>
        <Typography variant="body1" color="text.secondary">
          {date}
        </Typography>
      </Stack>
    </WidgetCard>
  )
}

