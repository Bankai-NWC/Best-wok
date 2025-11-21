import { Box, Skeleton, Stack } from '@mui/material'

function SkeletonProductSlider() {
  return (
    <Box component="section" mt={6}>
      <Box mt={6}>
        <Skeleton variant="rounded" width={220} height={42} />
      </Box>

      <Stack direction="row" alignItems="stretch" gap={6} mt={6}>
        <Skeleton variant="rounded" width={282} height={438} />
        <Skeleton variant="rounded" width={282} height={438} />
        <Skeleton variant="rounded" width={282} height={438} />
        <Skeleton variant="rounded" width={282} height={438} />
      </Stack>
    </Box>
  )
}

export default SkeletonProductSlider
