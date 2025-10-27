import { Stack, Typography } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import style from './AboutNumberCard.module.scss'

interface Props {
  value: number
  unit?: string
  description: string
  duration?: number
}

const AboutNumberCard: FC<Props> = ({ value, unit, description, duration = 3 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const step = Math.ceil(value / (duration * 60))
      const interval = setInterval(() => {
        start += step
        if (start >= value) {
          start = value
          clearInterval(interval)
        }
        setCount(start)
      }, 1000 / 60)
      return () => clearInterval(interval)
    }
  }, [isInView, value, duration])

  return (
    <Stack ref={ref} flex={1} gap={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="body1"
          fontSize={{ xs: 64, md: 100 }}
          fontWeight={700}
          lineHeight={0.9}
          className={style['text-primary']}
        >
          {count.toLocaleString('en-US')}
          {unit && (
            <Typography component="span" fontSize={{ xs: 48, md: 72 }} lineHeight={1}>
              {unit}
            </Typography>
          )}
        </Typography>
      </motion.div>

      <Typography variant="body1" maxWidth={{ xs: '100%', md: '70%' }}>
        {description}
      </Typography>
    </Stack>
  )
}

export default AboutNumberCard
