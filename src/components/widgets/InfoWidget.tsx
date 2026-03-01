import { useState } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import { WidgetCard } from '../WidgetCard'
import { WidgetSettingsDialog } from '../dialogs/WidgetSettingsDialog'
import type { WidgetSettings } from '../../types/widget.types'

type InfoWidgetProps = {
  onRemove: () => void
  settings?: WidgetSettings
  onSettingsChange?: (settings: WidgetSettings) => void
}

export const InfoWidget = ({ onRemove, settings, onSettingsChange }: InfoWidgetProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const defaultTitle = 'Info Card'
  const defaultSubtitle = 'Static'

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
        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mt: 1 }}>
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
            <InfoIcon sx={{ color: '#0066cc' }} />
          </Box>
          <Box>
            <Typography variant="body1">
              This is a static information card. Use it to highlight important notes for your team.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Everything on this dashboard is powered purely by React state – no page reloads.
            </Typography>
          </Box>
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

