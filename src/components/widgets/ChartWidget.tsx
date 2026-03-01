import { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { WidgetCard } from '../WidgetCard'
import { chartData } from '../../constants/widgets.constants'
import { ChartSettingsDialog, type ChartType, type ChartStyle } from '../dialogs/ChartSettingsDialog'
import { WidgetSettingsDialog } from '../dialogs/WidgetSettingsDialog'
import type { WidgetSettings } from '../../types/widget.types'

type ChartWidgetProps = {
  onRemove: () => void
  settings?: WidgetSettings
  onSettingsChange?: (settings: WidgetSettings) => void
}

export const ChartWidget = ({ onRemove, settings, onSettingsChange }: ChartWidgetProps) => {
  const [chartSettingsOpen, setChartSettingsOpen] = useState(false)
  const [widgetSettingsOpen, setWidgetSettingsOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [chartType, setChartType] = useState<ChartType>('line')
  const [chartStyle, setChartStyle] = useState<ChartStyle>({
    color: '#0066cc',
    strokeWidth: 3,
  })

  const renderChart = () => {
    const commonChildren = (
      <>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </>
    )

    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            {commonChildren}
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartStyle.color}
              strokeWidth={chartStyle.strokeWidth}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )
      case 'bar':
        return (
          <BarChart data={chartData}>
            {commonChildren}
            <Bar dataKey="value" fill={chartStyle.color} radius={[8, 8, 0, 0]} />
          </BarChart>
        )
      case 'area':
        return (
          <AreaChart data={chartData}>
            {commonChildren}
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartStyle.color}
              fill={chartStyle.color}
              fillOpacity={0.3}
              strokeWidth={chartStyle.strokeWidth}
            />
          </AreaChart>
        )
      default:
        return null
    }
  }

  const defaultTitle = 'Sessions'
  const defaultSubtitle = 'Data visualization'

  const title = settings?.title ?? defaultTitle
  const subtitle = settings?.subtitle ?? defaultSubtitle

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onSettingsChange) {
      setMenuAnchor(event.currentTarget)
    } else {
      setChartSettingsOpen(true)
    }
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleWidgetSettings = () => {
    setWidgetSettingsOpen(true)
    handleMenuClose()
  }

  const handleChartSettings = () => {
    setChartSettingsOpen(true)
    handleMenuClose()
  }

  const settingsButton = (
    <>
      <IconButton size="small" onClick={handleSettingsClick} aria-label="Settings">
        <SettingsIcon fontSize="small" />
      </IconButton>
      {onSettingsChange && (
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={handleChartSettings}>Chart Settings</MenuItem>
          <MenuItem onClick={handleWidgetSettings}>Widget Settings</MenuItem>
        </Menu>
      )}
    </>
  )

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
        <Box sx={{ width: '100%', flex: 1, minHeight: 0, mt: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>
      </WidgetCard>
      <ChartSettingsDialog
        open={chartSettingsOpen}
        onClose={() => setChartSettingsOpen(false)}
        chartType={chartType}
        chartStyle={chartStyle}
        onChartTypeChange={setChartType}
        onChartStyleChange={setChartStyle}
      />
      {onSettingsChange && (
        <WidgetSettingsDialog
          open={widgetSettingsOpen}
          onClose={() => setWidgetSettingsOpen(false)}
          settings={settings ?? {}}
          onSettingsChange={onSettingsChange}
          defaultTitle={defaultTitle}
          defaultSubtitle={defaultSubtitle}
        />
      )}
    </>
  )
}

