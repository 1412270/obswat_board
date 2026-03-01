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

export type WidgetSettings = {
    title?: string
    subtitle?: string
    textColor?: string
    textSize?: number // in rem or px
}

export type WidgetConfig = {
    id: number
    type: WidgetType
    layout: LayoutItem
    settings?: WidgetSettings
}

