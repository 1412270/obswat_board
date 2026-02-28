import type { WidgetType } from '../types/widget.types'

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

