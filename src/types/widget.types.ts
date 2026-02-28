export type WidgetType = 'weather' | 'counter' | 'revenue' | 'clock' | 'chart' | 'info'

export type LayoutItem = {
    x: number
    y: number
    w: number
    h: number
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
}

export type WidgetConfig = {
    id: number
    type: WidgetType
    layout: LayoutItem
}

