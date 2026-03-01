import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type WidgetCardProps = {
  title: string
  subtitle?: string
  onRemove: () => void
  className?: string
  children: React.ReactNode
  settingsButton?: React.ReactNode
  textColor?: string
  textSize?: number
}

export const WidgetCard = ({
  title,
  subtitle,
  onRemove,
  className,
  children,
  settingsButton,
  textColor,
  textSize = 1,
}: WidgetCardProps) => {
  const titleStyle = {
    color: textColor,
    fontSize: `calc(1.25rem * ${textSize})`,
  }

  const subtitleStyle = {
    fontSize: `calc(0.875rem * ${textSize})`,
  }

  return (
    <Card className={`widget-card ${className ?? ''}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="widget-header">
          <Box>
            {subtitle && (
              <Typography variant="subtitle2" color="text.secondary" sx={subtitleStyle}>
                {subtitle}
              </Typography>
            )}
            <Typography variant="h6" sx={{ mt: subtitle ? 0.5 : 0, ...titleStyle }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {settingsButton}
            <IconButton size="small" onClick={onRemove} aria-label="Remove widget">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', color: textColor, fontSize: `calc(1rem * ${textSize})` }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}

