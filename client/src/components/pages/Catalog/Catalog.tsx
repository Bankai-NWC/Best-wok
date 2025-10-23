import PageTransition from '@/components/layout/PageTransition/PageTransition'
import ProductCard from '@/components/ui/Cards/ProductCard/ProductCard'
import { useGetCatalogQuery } from '@/store/services/api'
import { CatalogParams } from '@/types'
import { Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

function Catalog() {
  const { data: products, isLoading, error } = useGetCatalogQuery()

  const { category } = useParams<CatalogParams>()
  const { t } = useTranslation()

  if (error) return <p>Error!</p>

  return (
    <>
      <Divider />
      <PageTransition isReady={!isLoading && !error}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          textTransform={'uppercase'}
          sx={{ mt: 6 }}
        >
          {t(`menu.category.${category}`)}
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          component={'section'}
          justifyContent="start"
          alignItems="center"
          flexWrap="wrap"
          gap={6}
          mt={6}
        >
          {products
            ?.filter((p) => p.category.en === category)
            .map((p) => (
              <ProductCard
                key={p._id}
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
            ))}
        </Stack>
      </PageTransition>
    </>
  )
}

export default Catalog
