import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  isReady?: boolean
  children?: ReactNode
}

function PageTransition({ isReady = true, children }: Props) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ minHeight: '100vh' }}
      >
        {isReady && children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
