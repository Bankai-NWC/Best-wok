import ProductCard from '@/components/ui/Cards/ProductCard/ProductCard'
import { ProductSliderProps } from '@/types'
import ProductSliderButton from '@components/ui/Buttons/ProductSliderButton/ProductSliderButton'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './ProductSlider.module.scss'

function ProductSlider({ title, products, link }: ProductSliderProps) {
  const theme = useTheme()
  const lowerThanSm = useMediaQuery(theme.breakpoints.up('sm'))

  const { t } = useTranslation()
  const swiperRef = useRef<any>(null)

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  return (
    <Box component="section">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          component="h1"
          fontSize={{
            xs: 22,
            sm: 24,
            md: 34,
          }}
          fontWeight={600}
          textTransform={'uppercase'}
          sx={{ mt: 6 }}
        >
          {t(title)}
        </Typography>
        <Stack direction="row" alignItems="center" gap={4} mt={6}>
          {link && (
            <Typography variant="body1" component={Link} to={link} className={style.link}>
              {t('action_buttons.show_all')}
            </Typography>
          )}
          {lowerThanSm && <ProductSliderButton handlePrev={handlePrev} handleNext={handleNext} />}
        </Stack>
      </Stack>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        style={{ marginTop: 24 }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {products?.map((p) => (
          <SwiperSlide key={`hit-${p._id}`}>
            <ProductCard
              id={p._id}
              name={p.name}
              imageUrl={p.imageUrl}
              sale={p.sale}
              price={p.price}
              priceWithSale={p.priceWithSale}
              portion={p.portion}
              ingredients={p.ingredients}
              tags={p.tags.en}
              category={p.category.en}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default ProductSlider
