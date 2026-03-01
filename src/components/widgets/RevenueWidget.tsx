import { useState, useMemo } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import SettingsIcon from '@mui/icons-material/Settings'
import { WidgetCard } from '../WidgetCard'
import {
  CounterRevenueSettingsDialog,
  type CounterRevenueSettings,
  type TimeRange,
} from '../dialogs/CounterRevenueSettingsDialog'
import type { WidgetSettings } from '../../types/widget.types'

type RevenueWidgetProps = {
  onRemove: () => void
  settings?: WidgetSettings & Partial<CounterRevenueSettings>
  onSettingsChange?: (settings: WidgetSettings & Partial<CounterRevenueSettings>) => void
}

const getTimeRangeLabel = (timeRange: TimeRange): string => {
  switch (timeRange) {
    case 'today':
      return 'Today'
    case 'week':
      return 'This Week'
    case 'month':
      return 'This Month'
    case 'year':
      return 'This Year'
    default:
      return 'Today'
  }
}

// Generate consistent random revenue data based on time range
const getRevenueData = (timeRange: TimeRange): number => {
  // Use a seed based on time range to generate consistent but different values
  const seeds: Record<TimeRange, number> = {
    today: 7890,
    week: 2345,
    month: 6789,
    year: 1234,
  }
  
  // Simple seeded random function
  const seed = seeds[timeRange]
  const random = ((seed * 9301 + 49297) % 233280) / 233280
  
  // Different ranges for different time periods (revenue scales with time)
  const ranges: Record<TimeRange, { min: number; max: number }> = {
    today: { min: 10000, max: 50000 },
    week: { min: 70000, max: 350000 },
    month: { min: 300000, max: 1500000 },
    year: { min: 3600000, max: 18000000 },
  }
  
  const range = ranges[timeRange]
  return range.min + random * (range.max - range.min)
}

export const RevenueWidget = ({ onRemove, settings, onSettingsChange }: RevenueWidgetProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const timeRange = (settings as CounterRevenueSettings)?.timeRange ?? 'today'
  
  // Generate revenue data based on time range
  const target = useMemo(() => getRevenueData(timeRange), [timeRange])

  const defaultTitle = 'Revenue'
  const defaultSubtitle = 'Today'

  const title = settings?.title ?? defaultTitle
  const subtitle = settings?.subtitle ?? getTimeRangeLabel(timeRange)

  const settingsButton = onSettingsChange ? (
    <IconButton size="small" onClick={() => setSettingsOpen(true)} aria-label="Widget settings">
      <SettingsIcon fontSize="small" />
    </IconButton>
  ) : undefined

  return (
    <>
      <WidgetCard
        title={title}
        subtitle={subtitle}
        onRemove={onRemove}
        settingsButton={settingsButton}
        textColor={settings?.textColor}
        textSize={settings?.textSize}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'rgba(0, 168, 232, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUpIcon sx={{ color: '#00a8e8' }} />
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
      {onSettingsChange && (
        <CounterRevenueSettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={(settings ?? {}) as CounterRevenueSettings}
          onSettingsChange={(newSettings) =>
            onSettingsChange(newSettings as WidgetSettings & Partial<CounterRevenueSettings>)
          }
          defaultTitle={defaultTitle}
          defaultSubtitle={defaultSubtitle}
        />
      )}
    </>
  )
}

