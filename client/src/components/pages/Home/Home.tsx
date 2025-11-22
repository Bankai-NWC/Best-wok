import PageTransition from '@/components/layout/PageTransition/PageTransition'
import SkeletonProductSlider from '@/components/ui/Skeletons/SkeletonsProductSlider/SkeletonProductSlider'
import { useGetCatalogQuery } from '@/store/services/api'
import { shuffleArr } from '@/utils/shuffleArr'
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material'
import { lazy, Suspense, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Home.scss'

import { AppRoutes } from '@/constants/appRoutes'
import { PromoImages } from '@/constants/images'
import { svgs } from '@/constants/svgs'
import { buildRoute } from '@/utils/buildRoute'
import { Link } from 'react-router-dom'

const LazyProductSlider = lazy(() => import('@/components/ui/Sliders/ProductSlider/ProductSlider'))
const LazyPromoSlider = lazy(() => import('@/components/ui/Sliders/PromoSlider/PromoSlider'))

function Home() {
  const { t } = useTranslation()

  const { data: products, isLoading, error } = useGetCatalogQuery()

  const [readMore, setReadMore] = useState(false)
  const seoBlockRef = useRef(null)
  const seoBlockBtnRef = useRef(null)

  const { Delivery } = svgs
  const { promo1, promo2, promo3 } = PromoImages

  const productSliderInfos = [
    {
      title: 'pages.home_page.title',
      products: shuffleArr(products?.filter((p) => p.tags.en.includes('hit')) ?? []),
    },
    {
      title: 'menu.category.wok',
      products: products?.filter((p) => p.category.en === 'wok'),
      link: AppRoutes.CATALOG.WOK,
    },
    {
      title: 'menu.category.rolls',
      products: products?.filter((p) => p.category.en === 'rolls'),
      link: AppRoutes.CATALOG.ROLLS,
    },
    {
      title: 'menu.category.poke-bouly',
      products: products?.filter((p) => p.category.en === 'poke-bouly'),
      link: AppRoutes.CATALOG.POKE_BOWLS,
    },
    {
      title: 'menu.category.street-food',
      products: products?.filter((p) => p.category.en === 'street-food'),
      link: AppRoutes.CATALOG.STREET_FOOD,
    },
    {
      title: 'menu.category.soups',
      products: products?.filter((p) => p.category.en === 'soups'),
      link: AppRoutes.CATALOG.SOUPS,
    },
  ]

  const promoSlides = [
    {
      image: promo1,
      link: buildRoute.promo('1'),
      alt: '10% discount on pickup',
    },
    {
      image: promo2,
      link: AppRoutes.CATALOG.WOK,
      alt: 'Try the updated wok menu',
    },
    {
      image: promo3,
      link: AppRoutes.CATALOG.POKE_BOWLS,
      alt: 'Try our new breakfasts',
    },
  ]

  if (error) return <p>Error!</p>

  return (
    <>
      <Divider />
      <Box mt={4} mb={2}>
        <Typography
          variant="body1"
          component={Link}
          to={AppRoutes.PAYMENT_AND_DELIVERY}
          gap={1}
          className="delivery-link"
        >
          <Delivery />
          {t('action_buttons.delivery_terms')}
        </Typography>
      </Box>

      <PageTransition isReady={!isLoading && !error}>
        <Suspense
          fallback={
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                '&::before': {
                  content: '""',
                  display: 'block',
                  paddingTop: '25%',
                },
              }}
            >
              <Skeleton
                variant="rounded"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  maxHeight: 351,
                }}
              />
            </Box>
          }
        >
          <LazyPromoSlider slides={promoSlides} />
        </Suspense>
        <Stack mt={6}>
          {productSliderInfos.map((item, index) => (
            <Suspense key={`${item.title}-${index}`} fallback={<SkeletonProductSlider />}>
              <LazyProductSlider title={item.title} products={item.products} link={item.link} />
            </Suspense>
          ))}
        </Stack>
        <Stack className={`seo-block  ${readMore ? 'active' : ''}`} ref={seoBlockRef}>
          <Stack mt={6}>
            <Typography
              variant="h4"
              fontSize={{ xs: 22, sm: 22, md: 28 }}
              fontWeight={600}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_1.title')}
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={300}
              mt={2}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_1.text_1')}
            </Typography>
          </Stack>
          <Stack mt={6}>
            <Typography
              variant="h4"
              fontSize={{ xs: 20, sm: 20, md: 22 }}
              fontWeight={600}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_2.title')}
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={300}
              mt={2}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_2.text_1')}
            </Typography>
          </Stack>
          <Stack mt={6}>
            <Typography
              variant="h4"
              fontSize={{ xs: 20, sm: 20, md: 22 }}
              fontWeight={600}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_3.title')}
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={300}
              mt={2}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_3.text_1')}
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={300}
              mt={2}
              color="text.secondary"
            >
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_2')}
              <br />
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_3')}
              <br />
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_4')}
              <br />
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_5')}
              <br />
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_6')}
              <br />
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_7')}
              <br />
              <br />
              {t('pages.home_page.seo_block.paragraph_3.text_8')}
            </Typography>
          </Stack>
          <Stack mt={6}>
            <Typography
              variant="h4"
              fontSize={{ xs: 20, sm: 20, md: 22 }}
              fontWeight={600}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_4.title')}
            </Typography>
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={300}
              mt={2}
              color="text.secondary"
            >
              {t('pages.home_page.seo_block.paragraph_4.text_1')}
            </Typography>
          </Stack>
        </Stack>
        <button
          onClick={() => setReadMore((prev) => !prev)}
          className={`seo-block__trigger ${readMore ? 'active' : ''}`}
          ref={seoBlockBtnRef}
        >
          {readMore ? t('action_buttons.read_less') : t('action_buttons.read_more')}
        </button>
      </PageTransition>
    </>
  )
}

export default Home
