import type { WidgetConfig, WidgetSettings } from '../../types/widget.types'
import { WeatherWidget } from './WeatherWidget'
import { CounterWidget } from './CounterWidget'
import { RevenueWidget } from './RevenueWidget'
import { ClockWidget } from './ClockWidget'
import { InfoWidget } from './InfoWidget'
import { ChartWidget } from './ChartWidget'

type WidgetRendererProps = {
  widget: WidgetConfig
  onRemove: (id: number) => void
  onSettingsChange?: (id: number, settings: WidgetSettings) => void
}

export const WidgetRenderer = ({ widget, onRemove, onSettingsChange }: WidgetRendererProps) => {
  const handleRemove = () => onRemove(widget.id)
  const handleSettingsChange = (settings: WidgetSettings) => {
    if (onSettingsChange) {
      onSettingsChange(widget.id, settings)
    }
  }

  switch (widget.type) {
    case 'weather':
      return (
        <WeatherWidget
          onRemove={handleRemove}
          settings={widget.settings}
          onSettingsChange={onSettingsChange ? handleSettingsChange : undefined}
        />
      )
    case 'counter':
      return (
        <CounterWidget
          onRemove={handleRemove}
          settings={widget.settings}
          onSettingsChange={onSettingsChange ? handleSettingsChange : undefined}
        />
      )
    case 'revenue':
      return (
        <RevenueWidget
          onRemove={handleRemove}
          settings={widget.settings}
          onSettingsChange={onSettingsChange ? handleSettingsChange : undefined}
        />
      )
    case 'clock':
      return (
        <ClockWidget
          onRemove={handleRemove}
          settings={widget.settings}
          onSettingsChange={onSettingsChange ? handleSettingsChange : undefined}
        />
      )
    case 'info':
      return (
        <InfoWidget
          onRemove={handleRemove}
          settings={widget.settings}
          onSettingsChange={onSettingsChange ? handleSettingsChange : undefined}
        />
      )
    case 'chart':
      return (
        <ChartWidget
          onRemove={handleRemove}
          settings={widget.settings}
          onSettingsChange={onSettingsChange ? handleSettingsChange : undefined}
        />
      )
    default:
      return null
  }
}

