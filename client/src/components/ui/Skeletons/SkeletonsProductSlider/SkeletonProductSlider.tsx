import { Box, Skeleton, Stack } from '@mui/material'

function SkeletonProductSlider() {
  const skeletons = [
    { display: 'block' },
    { display: { xs: 'none', sm: 'block' } },
    { display: { xs: 'none', md: 'block' } },
    { display: { xs: 'none', lg: 'block' } },
  ]

  return (
    <Box component="section" mt={6}>
      <Box mb={4}>
        {' '}
        <Skeleton variant="rounded" width={220} height={42} />
      </Box>

      <Stack direction="row" alignItems="stretch" justifyContent="space-around" gap={6}>
        {skeletons.map((item, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={282}
            height={438}
            sx={{
              display: item.display,
              flexShrink: 0,
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default SkeletonProductSlider
