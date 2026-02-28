import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

type AnimatedCounterProps = {
  target: number
  decimals?: number
}

export const AnimatedCounter = ({ target, decimals = 0 }: AnimatedCounterProps) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frameId: number
    const start = performance.now()
    const duration = 1200

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const next = target * progress
      setValue(next)
      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [target])

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')

  return (
    <Typography variant="h3" component="div">
      {formatted}
    </Typography>
  )
}

