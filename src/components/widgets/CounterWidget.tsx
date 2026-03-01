import { useState, useMemo } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import { WidgetCard } from '../WidgetCard'
import { AnimatedCounter } from '../AnimatedCounter'
import {
  CounterRevenueSettingsDialog,
  type CounterRevenueSettings,
  type TimeRange,
} from '../dialogs/CounterRevenueSettingsDialog'
import type { WidgetSettings } from '../../types/widget.types'

type CounterWidgetProps = {
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

// Generate consistent random data based on time range
const getCounterData = (timeRange: TimeRange): number => {
  // Use a seed based on time range to generate consistent but different values
  const seeds: Record<TimeRange, number> = {
    today: 1234,
    week: 5678,
    month: 9012,
    year: 3456,
  }
  
  // Simple seeded random function
  const seed = seeds[timeRange]
  const random = ((seed * 9301 + 49297) % 233280) / 233280
  
  // Different ranges for different time periods
  const ranges: Record<TimeRange, { min: number; max: number }> = {
    today: { min: 1.2, max: 1.8 },
    week: { min: 8.5, max: 12.3 },
    month: { min: 35.2, max: 48.7 },
    year: { min: 420.5, max: 580.3 },
  }
  
  const range = ranges[timeRange]
  return range.min + random * (range.max - range.min)
}

export const CounterWidget = ({ onRemove, settings, onSettingsChange }: CounterWidgetProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const timeRange = (settings as CounterRevenueSettings)?.timeRange ?? 'today'
  
  // Generate data based on time range
  const target = useMemo(() => getCounterData(timeRange), [timeRange])

  const defaultTitle = 'Users Online'
  const defaultSubtitle = 'Counter'

  const title = settings?.title ?? defaultTitle
  const subtitle = settings?.subtitle ?? `${defaultSubtitle} - ${getTimeRangeLabel(timeRange)}`

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
              bgcolor: 'rgba(0, 102, 204, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PeopleAltIcon sx={{ color: '#0066cc' }} />
          </Box>
          <Box>
            <AnimatedCounter target={target} decimals={3} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Live users viewing your dashboard.
            </Typography>
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

