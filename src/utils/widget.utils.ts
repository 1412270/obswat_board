import type { WidgetType, LayoutItem } from '../types/widget.types'

export const getGridSpan = (type: WidgetType): number => {
    switch (type) {
        case 'weather':
            return 2
        case 'chart':
            return 2
        default:
            return 1
    }
}

export const getDefaultLayout = (type: WidgetType, _id: number, existingLayouts: LayoutItem[]): LayoutItem => {
    // Find the bottom-most position
    const maxY = existingLayouts.length > 0
        ? Math.max(...existingLayouts.map(l => l.y + l.h))
        : 0

    // Default sizes based on widget type
    const defaults: Record<WidgetType, { w: number; h: number; minW: number; minH: number }> = {
        weather: { w: 2, h: 2, minW: 1, minH: 2 },
        chart: { w: 2, h: 3, minW: 2, minH: 2 },
        counter: { w: 1, h: 2, minW: 1, minH: 1 },
        revenue: { w: 1, h: 2, minW: 1, minH: 1 },
        clock: { w: 1, h: 2, minW: 1, minH: 1 },
        info: { w: 1, h: 2, minW: 1, minH: 1 },
    }

    const config = defaults[type]

    // Find available x position (try to fit in first available column)
    let x = 0
    const cols = 3 // 3-column grid
    let found = false

    while (!found && x < cols) {
        const wouldOverlap = existingLayouts.some(layout => {
            const layoutEndX = layout.x + layout.w
            const layoutEndY = layout.y + layout.h
            return (
                x < layoutEndX &&
                x + config.w > layout.x &&
                maxY < layoutEndY &&
                maxY + config.h > layout.y
            )
        })

        if (!wouldOverlap && x + config.w <= cols) {
            found = true
        } else {
            x++
        }
    }

    // If no space found, place at the bottom
    if (!found) {
        x = 0
    }

    return {
        x,
        y: maxY,
        w: config.w,
        h: config.h,
        minW: config.minW,
        minH: config.minH,
    }
}

