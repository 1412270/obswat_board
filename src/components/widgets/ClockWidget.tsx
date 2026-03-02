import { useEffect, useState } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { WidgetCard } from '../WidgetCard'
import { ClockSettingsDialog, type ClockSettings, type ClockDisplayStyle } from '../dialogs/ClockSettingsDialog'
import type { WidgetSettings } from '../../types/widget.types'

type ClockWidgetProps = {
  onRemove: () => void
  settings?: WidgetSettings & Partial<ClockSettings>
  onSettingsChange?: (settings: WidgetSettings & Partial<ClockSettings>) => void
}

const renderClockDisplay = (
  displayStyle: ClockDisplayStyle,
  now: Date,
  textColor?: string
): React.ReactNode => {
  const time24 = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const date = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const dateShort = now.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Helper function to get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Helper function to get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  switch (displayStyle) {
    case 'text':
      return (
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Typography variant="h4" component="div" sx={{ color: textColor }}>
            {time24}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {date}
          </Typography>
        </Stack>
      )

    case 'calendar':
      const daysInMonth = getDaysInMonth(now)
      const firstDay = getFirstDayOfMonth(now)
      const currentDay = now.getDate()
      const monthName = now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
      const emptyDays = Array.from({ length: firstDay })

      return (
        <Stack spacing={2} sx={{ mt: 1, width: '100%' }}>
          {/* Time display */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: textColor, fontWeight: 600 }}>
              {time24}
            </Typography>
          </Box>
          
          {/* Calendar */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center', fontWeight: 600 }}>
              {monthName}
            </Typography>
            {/* Week day headers */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 0.5 }}>
              {weekDays.map((day) => (
                <Typography
                  key={day}
                  variant="caption"
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontWeight: 600,
                    py: 0.5,
                  }}
                >
                  {day}
                </Typography>
              ))}
            </Box>
            {/* Calendar grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
              {emptyDays.map((_, index) => (
                <Box key={`empty-${index}`} sx={{ aspectRatio: '1' }} />
              ))}
              {days.map((day) => (
                <Box
                  key={day}
                  sx={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    bgcolor: day === currentDay ? 'rgba(0, 102, 204, 0.3)' : 'transparent',
                    border: day === currentDay ? `2px solid ${textColor || '#0066cc'}` : 'none',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: day === currentDay ? textColor || '#0066cc' : 'text.primary',
                      fontWeight: day === currentDay ? 600 : 400,
                    }}
                  >
                    {day}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      )

    case 'digital':
      return (
        <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <Box
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 2,
              px: 3,
              py: 2,
              border: '1px solid rgba(0, 102, 204, 0.3)',
            }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{
                color: textColor || '#00a8e8',
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              {time24}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {dateShort}
          </Typography>
        </Stack>
      )

    default:
      return (
        <Typography variant="body1" color="text.secondary">
          {date}
        </Typography>
      )
  }
}

export const ClockWidget = ({ onRemove, settings, onSettingsChange }: ClockWidgetProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const defaultTitle = 'Current Time'
  const defaultSubtitle = 'Clock'
  const displayStyle = (settings as ClockSettings)?.displayStyle ?? 'text'

  // For clock, always use default title or custom title (not time in title to avoid duplication)
  const title = settings?.title ?? defaultTitle
  const subtitle = settings?.subtitle ?? defaultSubtitle

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
          {renderClockDisplay(displayStyle, now, settings?.textColor)}
        </Box>
      </WidgetCard>
      {onSettingsChange && (
        <ClockSettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={(settings ?? {}) as ClockSettings}
          onSettingsChange={(newSettings) =>
            onSettingsChange(newSettings as WidgetSettings & Partial<ClockSettings>)
          }
          defaultTitle={defaultTitle}
          defaultSubtitle={defaultSubtitle}
        />
      )}
    </>
  )
}

