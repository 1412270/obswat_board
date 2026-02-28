import { useMemo } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import { WidgetCard } from '../WidgetCard'

type RevenueWidgetProps = {
  onRemove: () => void
}

export const RevenueWidget = ({ onRemove }: RevenueWidgetProps) => {
  const target = useMemo(() => 10000 + Math.random() * 40000, [])

  return (
    <WidgetCard title="Revenue" subtitle="Today" onRemove={onRemove}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TrendingUpIcon sx={{ color: '#16a34a' }} />
        </Box>
        <Box>
          <Typography variant="h3" component="div">
            $
            {Math.round(target)
              .toLocaleString('en-US', {
                minimumFractionDigits: 0,
              })
              .replace(',', '.')}
          </Typography>
          <div className="metric-trend-up">
            <QueryStatsIcon sx={{ fontSize: 18 }} />
            <span>+4.2% vs yesterday</span>
          </div>
        </Box>
      </Stack>
    </WidgetCard>
  )
}

