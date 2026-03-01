import { useState, useCallback } from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import type { ResponsiveLayouts, LayoutItem } from 'react-grid-layout'
import type { WidgetType, WidgetSettings } from './types/widget.types'
import { defaultWidgets } from './constants/widgets.constants'
import { dashboardTheme } from './theme/theme'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardGrid } from './components/DashboardGrid'
import { AddWidgetDialog } from './components/dialogs/AddWidgetDialog'
import { getDefaultLayout } from './utils/widget.utils'
import './App.css'

function App() {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [showAddWidget, setShowAddWidget] = useState(false)
  const [nextId, setNextId] = useState(defaultWidgets.length + 1)

  const handleAddWidget = (type: WidgetType) => {
    const existingLayouts = widgets.map(w => w.layout)
    const newLayout = getDefaultLayout(type, nextId, existingLayouts)
    
    setWidgets((prev) => [...prev, { id: nextId, type, layout: newLayout }])
    setNextId((id) => id + 1)
  }

  const handleRemoveWidget = (id: number) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id))
  }

  const handleSettingsChange = useCallback((id: number, settings: WidgetSettings) => {
    setWidgets((prev) =>
      prev.map((widget) => (widget.id === id ? { ...widget, settings } : widget))
    )
  }, [])

  const handleLayoutChange = useCallback((_layout: unknown, layouts: ResponsiveLayouts) => {
    // Update widget layouts based on react-grid-layout changes
    // We use 'lg' layout as the source of truth for desktop
    const lgLayout = layouts.lg || layouts.md || layouts.sm || layouts.xs || []
    
    setWidgets((prev) =>
      prev.map((widget) => {
        const layoutItem = lgLayout.find((l: LayoutItem) => l.i === widget.id.toString())
        if (layoutItem) {
          return {
            ...widget,
            layout: {
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h,
              minW: layoutItem.minW,
              minH: layoutItem.minH,
              maxW: layoutItem.maxW,
              maxH: layoutItem.maxH,
            },
          }
        }
        return widget
      })
    )
  }, [])

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box className="app-root">
        <DashboardHeader onAddWidget={() => setShowAddWidget(true)} />

        <main className="app-main">
          <DashboardGrid 
            widgets={widgets} 
            onRemoveWidget={handleRemoveWidget}
            onLayoutChange={handleLayoutChange}
            onSettingsChange={handleSettingsChange}
          />
        </main>

        <AddWidgetDialog
          open={showAddWidget}
          onClose={() => setShowAddWidget(false)}
          onSelect={handleAddWidget}
        />
      </Box>
    </ThemeProvider>
  )
}

export default App
