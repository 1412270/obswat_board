import { Box } from '@mui/material'
import type { WidgetConfig } from '../types/widget.types'
import { WidgetRenderer } from './widgets/WidgetRenderer'
import { getGridSpan } from '../utils/widget.utils'

type DashboardGridProps = {
  widgets: WidgetConfig[]
  onRemoveWidget: (id: number) => void
}

export const DashboardGrid = ({ widgets, onRemoveWidget }: DashboardGridProps) => {
  return (
    <Box
      className="widget-grid"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(3, minmax(0, 1fr))',
        },
        gap: 3,
      }}
    >
      {widgets.map((w) => {
        const span = getGridSpan(w.type)
        return (
          <Box
            key={w.id}
            sx={{
              gridColumn: {
                xs: 'span 1',
                md: `span ${span}`,
              },
            }}
          >
            <WidgetRenderer widget={w} onRemove={onRemoveWidget} />
          </Box>
        )
      })}
    </Box>
  )
}

