import { Responsive, WidthProvider } from 'react-grid-layout/legacy'
import type { LayoutItem, ResponsiveLayouts } from 'react-grid-layout'
import type { WidgetConfig, WidgetSettings } from '../types/widget.types'
import { WidgetRenderer } from './widgets/WidgetRenderer'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

type DashboardGridProps = {
  widgets: WidgetConfig[]
  onRemoveWidget: (id: number) => void
  onLayoutChange: (_layout: unknown, layouts: ResponsiveLayouts) => void
  onSettingsChange?: (id: number, settings: WidgetSettings) => void
}

export const DashboardGrid = ({ widgets, onRemoveWidget, onLayoutChange, onSettingsChange }: DashboardGridProps) => {
  // Convert widgets to react-grid-layout format
  const layouts: ResponsiveLayouts = {
    lg: widgets.map((widget): LayoutItem => ({
      i: widget.id.toString(),
      x: widget.layout.x,
      y: widget.layout.y,
      w: widget.layout.w,
      h: widget.layout.h,
      minW: widget.layout.minW ?? 1,
      minH: widget.layout.minH ?? 1,
      maxW: widget.layout.maxW,
      maxH: widget.layout.maxH,
    })),
    md: widgets.map((widget): LayoutItem => ({
      i: widget.id.toString(),
      x: widget.layout.x,
      y: widget.layout.y,
      w: widget.layout.w,
      h: widget.layout.h,
      minW: widget.layout.minW ?? 1,
      minH: widget.layout.minH ?? 1,
      maxW: widget.layout.maxW,
      maxH: widget.layout.maxH,
    })),
    sm: widgets.map((widget): LayoutItem => ({
      i: widget.id.toString(),
      x: 0,
      y: widgets.indexOf(widget),
      w: 1,
      h: widget.layout.h,
      minW: 1,
      minH: widget.layout.minH ?? 1,
    })),
    xs: widgets.map((widget): LayoutItem => ({
      i: widget.id.toString(),
      x: 0,
      y: widgets.indexOf(widget),
      w: 1,
      h: widget.layout.h,
      minW: 1,
      minH: widget.layout.minH ?? 1,
    })),
  }

  return (
    <ResponsiveGridLayout
      className="widget-grid"
      layouts={layouts}
      onLayoutChange={onLayoutChange}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 1, xs: 1, xxs: 1 }}
      rowHeight={120}
      isDraggable={true}
      isResizable={true}
      margin={[24, 24]}
      containerPadding={[0, 0]}
      useCSSTransforms={true}
    >
      {widgets.map((widget) => (
        <div key={widget.id} style={{ height: '100%' }}>
          <WidgetRenderer widget={widget} onRemove={onRemoveWidget} onSettingsChange={onSettingsChange} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}

