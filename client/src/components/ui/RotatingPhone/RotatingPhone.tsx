import { svgs } from '@/constants/svgs'
import { Box, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function RotatingPhone() {
  const [index, setIndex] = useState(0)

  const { Kyivstar, Vodafone, Lifecell } = svgs

  const operators = [
    { icon: <Kyivstar width={24} height={24} />, code: '067', color: '#0078FF' }, // синий
    { icon: <Vodafone width={24} height={24} />, code: '050', color: '#E60000' }, // красный
    { icon: <Lifecell width={24} height={24} />, code: '063', color: '#FECF00' }, // жёлтый
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % operators.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const { icon, code, color } = operators[index]

  return (
    <Box
      component={'a'}
      href={`tel: +38 ${code} 123 45 67`}
      style={{ display: 'flex', alignItems: 'center', fontSize: 16 }}
    >
      <Typography component="span" color="text.primary" fontSize={24} mr={1}>
        +38
      </Typography>
      <Stack flexDirection='row' gap={0.5}>
        <AnimatePresence mode="wait">
          <motion.span
            key={code + '-icon'}
            style={{ display: 'flex', alignItems: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={code}
            style={{ color, fontSize: 24 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {code}
          </motion.span>
        </AnimatePresence>
      </Stack>
      <Typography component="span" color="text.primary" fontSize={24} ml={1}>
        {' '}
        123 45 67
      </Typography>
    </Box>
  )
}

export default RotatingPhone
