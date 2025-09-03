import { Box, Stack, Typography } from '@mui/material'
import style from './ProductCardChip.module.scss'

type Proprs = {
  id: string
  tags: string[]
}

function ProductCardChip({ id, tags }: Proprs) {
  const chips = tags
    .filter((tag) => tag === 'new' || tag === 'hit' || tag === 'vegetarian')
    .map((tag, idx) =>
      tag === 'new' ? (
        <Box key={`${id}-${tag}-${idx}`} className={style.chip_new} display="inline-flex">
          <Typography variant="body1" fontWeight={600}>
            {tag}
          </Typography>
        </Box>
      ) : tag === 'hit' ? (
        <Box key={`${id}-${tag}-${idx}`} className={style.chip_popular} display="inline-flex">
          <Typography variant="body1" fontWeight={600}>
            &#129304;{tag}
          </Typography>
        </Box>
      ) : (
        <Box key={`${id}-${tag}-${idx}`} className={style.chip_vegetarian} display="inline-flex">
          <Typography variant="body1" fontWeight={600}>
            &#127793;{tag}
          </Typography>
        </Box>
      ),
    )

  return (
    <Stack direction="column" alignItems="flex-start" spacing={2} className={style.container}>
      {chips}
    </Stack>
  )
}

export default ProductCardChip
