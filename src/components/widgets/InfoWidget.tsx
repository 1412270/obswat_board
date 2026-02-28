import { Box, Stack, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { WidgetCard } from '../WidgetCard'

type InfoWidgetProps = {
  onRemove: () => void
}

export const InfoWidget = ({ onRemove }: InfoWidgetProps) => {
  return (
    <WidgetCard title="Info Card" subtitle="Static" onRemove={onRemove}>
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mt: 1 }}>
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
          <InfoIcon sx={{ color: '#0284c7' }} />
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
  )
}

