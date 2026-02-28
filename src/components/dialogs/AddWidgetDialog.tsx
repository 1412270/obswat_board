import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import InfoIcon from '@mui/icons-material/Info'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BarChartIcon from '@mui/icons-material/BarChart'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import type { WidgetType } from '../../types/widget.types'

type AddWidgetDialogProps = {
  open: boolean
  onClose: () => void
  onSelect: (type: WidgetType) => void
}

export const AddWidgetDialog = ({ open, onClose, onSelect }: AddWidgetDialogProps) => {
  const options: { type: WidgetType; label: string; description: string; icon: React.ReactNode }[] =
    [
      {
        type: 'weather',
        label: 'Weather',
        description: 'Display weather information',
        icon: <WbSunnyIcon sx={{ fontSize: 32, color: '#facc15' }} />,
      },
      {
        type: 'counter',
        label: 'Counter',
        description: 'Animated number counter',
        icon: <PeopleAltIcon sx={{ fontSize: 32, color: '#0284c7' }} />,
      },
      {
        type: 'info',
        label: 'Info Card',
        description: 'Display information',
        icon: <InfoIcon sx={{ fontSize: 32, color: '#3b82f6' }} />,
      },
      {
        type: 'clock',
        label: 'Clock',
        description: 'Real-time clock',
        icon: <AccessTimeIcon sx={{ fontSize: 32, color: '#4f46e5' }} />,
      },
      {
        type: 'counter',
        label: 'Statistics',
        description: 'Display metrics',
        icon: <BarChartIcon sx={{ fontSize: 32, color: '#22c55e' }} />,
      },
      {
        type: 'chart',
        label: 'Chart',
        description: 'Data visualization',
        icon: <ShowChartIcon sx={{ fontSize: 32, color: '#ec4899' }} />,
      },
    ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">Add Widget</Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a widget to add to your dashboard
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="Close add widget dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {options.map((opt, index) => (
            <Box key={`${opt.type}-${index}`}>
              <CardActionArea
                onClick={() => {
                  onSelect(opt.type)
                  onClose()
                }}
              >
                <Card variant="outlined" sx={{ borderRadius: 3, p: 1.5 }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {opt.icon}
                      <Box>
                        <Typography variant="subtitle1">{opt.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {opt.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

