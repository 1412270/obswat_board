import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type WidgetCardProps = {
  title: string
  subtitle?: string
  onRemove: () => void
  className?: string
  children: React.ReactNode
}

export const WidgetCard = ({ title, subtitle, onRemove, className, children }: WidgetCardProps) => {
  return (
    <Card className={`widget-card ${className ?? ''}`}>
      <CardContent>
        <div className="widget-header">
          <Box>
            {subtitle && (
              <Typography variant="subtitle2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            <Typography variant="h6" sx={{ mt: subtitle ? 0.5 : 0 }}>
              {title}
            </Typography>
          </Box>
          <IconButton size="small" onClick={onRemove} aria-label="Remove widget">
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

