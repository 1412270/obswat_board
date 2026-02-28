import type { WidgetConfig } from '../../types/widget.types'
import { WeatherWidget } from './WeatherWidget'
import { CounterWidget } from './CounterWidget'
import { RevenueWidget } from './RevenueWidget'
import { ClockWidget } from './ClockWidget'
import { InfoWidget } from './InfoWidget'
import { ChartWidget } from './ChartWidget'

type WidgetRendererProps = {
  widget: WidgetConfig
  onRemove: (id: number) => void
}

export const WidgetRenderer = ({ widget, onRemove }: WidgetRendererProps) => {
  const handleRemove = () => onRemove(widget.id)

  switch (widget.type) {
    case 'weather':
      return <WeatherWidget onRemove={handleRemove} />
    case 'counter':
      return <CounterWidget onRemove={handleRemove} />
    case 'revenue':
      return <RevenueWidget onRemove={handleRemove} />
    case 'clock':
      return <ClockWidget onRemove={handleRemove} />
    case 'info':
      return <InfoWidget onRemove={handleRemove} />
    case 'chart':
      return <ChartWidget onRemove={handleRemove} />
    default:
      return null
  }
}

