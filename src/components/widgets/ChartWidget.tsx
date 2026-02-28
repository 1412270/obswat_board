import { Box } from '@mui/material'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { WidgetCard } from '../WidgetCard'
import { chartData } from '../../constants/widgets.constants'

type ChartWidgetProps = {
  onRemove: () => void
}

export const ChartWidget = ({ onRemove }: ChartWidgetProps) => {
  return (
    <WidgetCard title="Sessions" subtitle="Chart" onRemove={onRemove}>
      <Box sx={{ width: '100%', height: 220, mt: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </WidgetCard>
  )
}

