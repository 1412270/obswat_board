import { useEffect, useState } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SettingsIcon from '@mui/icons-material/Settings'
import { WidgetCard } from '../WidgetCard'
import { WidgetSettingsDialog } from '../dialogs/WidgetSettingsDialog'
import type { WidgetSettings } from '../../types/widget.types'

type ClockWidgetProps = {
  onRemove: () => void
  settings?: WidgetSettings
  onSettingsChange?: (settings: WidgetSettings) => void
}

export const ClockWidget = ({ onRemove, settings, onSettingsChange }: ClockWidgetProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)
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

  const defaultTitle = 'Current Time'
  const defaultSubtitle = 'Clock'

  // For clock, we use the current time as title if no custom title is set
  const title = settings?.title ?? time
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
            <AccessTimeIcon sx={{ color: '#0066cc' }} />
          </Box>
          <Typography variant="body1" color="text.secondary">
            {date}
          </Typography>
        </Stack>
      </WidgetCard>
      {onSettingsChange && (
        <WidgetSettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings ?? {}}
          onSettingsChange={onSettingsChange}
          defaultTitle={defaultTitle}
          defaultSubtitle={defaultSubtitle}
        />
      )}
    </>
  )
}

