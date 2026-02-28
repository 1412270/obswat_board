import type { WidgetConfig } from '../types/widget.types'

export const defaultWidgets: WidgetConfig[] = [
    {
        id: 1,
        type: 'weather',
        layout: { x: 0, y: 0, w: 2, h: 2, minW: 1, minH: 2 }
    },
    {
        id: 2,
        type: 'counter',
        layout: { x: 2, y: 0, w: 1, h: 2, minW: 1, minH: 1 }
    },
    {
        id: 3,
        type: 'revenue',
        layout: { x: 2, y: 2, w: 1, h: 2, minW: 1, minH: 1 }
    },
    {
        id: 4,
        type: 'clock',
        layout: { x: 0, y: 2, w: 1, h: 2, minW: 1, minH: 1 }
    },
]

export const chartData = [
    { name: 'Mon', value: 24 },
    { name: 'Tue', value: 31 },
    { name: 'Wed', value: 28 },
    { name: 'Thu', value: 35 },
    { name: 'Fri', value: 32 },
    { name: 'Sat', value: 40 },
    { name: 'Sun', value: 38 },
]

