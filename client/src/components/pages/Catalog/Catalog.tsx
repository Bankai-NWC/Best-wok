import ProductCard from '@components/ui/ProductCart/ProductCard'
import { Divider, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

interface Product {
  _id: string
  name: { en: string; ua: string }
  imageUrl: string
  sale: number
  price: number
  priceWithSale: number
  portion: number
  category: { en: string; ua: string }
}

function Catalog() {
  type Params = {
    category: string
  }

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const { category } = useParams<Params>()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <Divider />
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        textTransform={'uppercase'}
        sx={{ mt: 6 }}
      >
        {t(`category.${category}`)}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="start"
        alignItems="center"
        flexWrap="wrap"
        gap={6}
        mt={6}
      >
        {products.map((p) => (
          <ProductCard
            key={p._id}
            id={p._id}
            name={p.name}
            imageUrl={p.imageUrl}
            sale={p.sale}
            price={p.price}
            priceWithSale={p.priceWithSale}
            portion={p.portion}
            category={p.category.en}
          />
        ))}
      </Stack>
    </>
  )
}

export default Catalog
