import { Box } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type DropdownProps = {
  button: React.ReactNode
  children: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ button, children }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Box ref={ref} sx={{ position: 'relative', display: 'inline-block' }}>
      <Box onClick={() => setOpen((prev) => !prev)} sx={{ cursor: 'pointer' }}>
        {button}
      </Box>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: 8,
              background: '#1c1c1e',
              color: '#ffffff',
              borderRadius: 16,
              overflow: 'hidden',
              zIndex: 1000,
            }}
          >
            <Box>{children}</Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default Dropdown
