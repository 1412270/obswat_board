import { useState } from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import type { WidgetType } from './types/widget.types'
import { defaultWidgets } from './constants/widgets.constants'
import { dashboardTheme } from './theme/theme'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardGrid } from './components/DashboardGrid'
import { AddWidgetDialog } from './components/dialogs/AddWidgetDialog'
import './App.css'

function App() {
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [showAddWidget, setShowAddWidget] = useState(false)
  const [nextId, setNextId] = useState(defaultWidgets.length + 1)

  const handleAddWidget = (type: WidgetType) => {
    setWidgets((prev) => [...prev, { id: nextId, type }])
    setNextId((id) => id + 1)
  }

  const handleRemoveWidget = (id: number) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box className="app-root">
        <DashboardHeader onAddWidget={() => setShowAddWidget(true)} />

        <main className="app-main">
          <DashboardGrid widgets={widgets} onRemoveWidget={handleRemoveWidget} />
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
