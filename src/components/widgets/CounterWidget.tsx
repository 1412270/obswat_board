import { useMemo } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { WidgetCard } from '../WidgetCard'
import { AnimatedCounter } from '../AnimatedCounter'

type CounterWidgetProps = {
  onRemove: () => void
}

export const CounterWidget = ({ onRemove }: CounterWidgetProps) => {
  // random-ish target to keep it fun each mount
  const target = useMemo(() => 1.2 + Math.random() * 0.6, [])

  return (
    <WidgetCard title="Users Online" subtitle="Counter" onRemove={onRemove}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: '#e0f2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PeopleAltIcon sx={{ color: '#0284c7' }} />
        </Box>
        <Box>
          <AnimatedCounter target={target} decimals={3} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Live users viewing your dashboard.
          </Typography>
        </Box>
      </Stack>
    </WidgetCard>
  )
}

