import React, { useState } from 'react'
import style from './Styles.module.scss'

interface FormDataType {
  name: { en: string; ua: string }
  image: string
  portion: number
  ingredients: { en: string; ua: string }
  sale: number
  price: number
  tags: { en: string[]; ua: string[] }
  category: { en: string; ua: string }
  nutritionalValue: {
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    cellulose: number
  }
}

const CreateProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: { en: '', ua: '' },
    image: '',
    portion: 0,
    ingredients: { en: '', ua: '' },
    sale: 0,
    price: 0,
    tags: { en: [], ua: [] },
    category: { en: '', ua: '' },
    nutritionalValue: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0, cellulose: 0 },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormDataType,
    lang?: 'en' | 'ua',
  ) => {
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...(prev[field] as { en: string; ua: string }),
          [lang]: e.target.value,
        },
      }))
    } else {
      const value =
        field === 'portion' || field === 'sale' || field === 'price'
          ? Number(e.target.value)
          : e.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleNutritionalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nutrient: keyof FormDataType['nutritionalValue'],
  ) => {
    setFormData((prev) => ({
      ...prev,
      nutritionalValue: {
        ...prev.nutritionalValue,
        [nutrient]: Number(e.target.value),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        name: formData.name,
        imageUrl: formData.image,
        portion: formData.portion,
        ingredients: formData.ingredients,
        sale: formData.sale,
        price: formData.price,
        tags: formData.tags,
        category: formData.category,
        nutritionalValue: formData.nutritionalValue,
      }

      const res = await fetch('http://localhost:5000/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (res.ok) {
        alert('Product created!')
        setFormData({
          name: { en: '', ua: '' },
          image: '',
          portion: 0,
          ingredients: { en: '', ua: '' },
          sale: 0,
          price: 0,
          tags: { en: [], ua: [] },
          category: { en: '', ua: '' },
          nutritionalValue: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0, cellulose: 0 },
        })
      } else {
        const errData = await res.json()
        alert(`Error: ${errData.message || 'creating product'}`)
      }
    } catch (err) {
      console.error(err)
      alert('Server error')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Create Product</h2>

      <label>
        Name (EN):
        <input
          className={style.input}
          type="text"
          value={formData.name.en}
          onChange={(e) => handleChange(e, 'name', 'en')}
        />
      </label>
      <br />
      <label>
        Name (UA):
        <input
          className={style.input}
          type="text"
          value={formData.name.ua}
          onChange={(e) => handleChange(e, 'name', 'ua')}
        />
      </label>
      <br />

      <label>
        Image URL:
        <input
          className={style.input}
          type="text"
          value={formData.image}
          onChange={(e) => handleChange(e, 'image')}
        />
      </label>
      <br />

      <label>
        Portion:
        <input
          type="number"
          value={formData.portion}
          onChange={(e) => handleChange(e, 'portion')}
        />
      </label>
      <br />

      <label>
        Ingredients (EN):
        <input
          className={style.input}
          type="text"
          value={formData.ingredients.en}
          onChange={(e) => handleChange(e, 'ingredients', 'en')}
        />
      </label>
      <br />
      <label>
        Ingredients (UA):
        <input
          className={style.input}
          type="text"
          value={formData.ingredients.ua}
          onChange={(e) => handleChange(e, 'ingredients', 'ua')}
        />
      </label>
      <br />

      <label>
        Sale (%):
        <input type="number" value={formData.sale} onChange={(e) => handleChange(e, 'sale')} />
      </label>
      <br />

      <label>
        Price:
        <input type="number" value={formData.price} onChange={(e) => handleChange(e, 'price')} />
      </label>
      <br />

      <label>
        Category (EN):
        <input
          className={style.input}
          type="text"
          value={formData.category.en}
          onChange={(e) => handleChange(e, 'category', 'en')}
        />
      </label>
      <br />
      <label>
        Category (UA):
        <input
          className={style.input}
          type="text"
          value={formData.category.ua}
          onChange={(e) => handleChange(e, 'category', 'ua')}
        />
      </label>
      <br />

      <label>
        Tags (EN, comma separated):
        <input
          className={style.input}
          type="text"
          value={formData.tags.en.join(', ')}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tags: { ...prev.tags, en: e.target.value.split(',').map((t) => t.trim()) },
            }))
          }
        />
      </label>
      <br />
      <label>
        Tags (UA, comma separated):
        <input
          className={style.input}
          type="text"
          value={formData.tags.ua.join(', ')}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tags: { ...prev.tags, ua: e.target.value.split(',').map((t) => t.trim()) },
            }))
          }
        />
      </label>
      <br />
      <h3>Nutritional Value</h3>
      <label>
        Calories:
        <input
          type="number"
          value={formData.nutritionalValue.calories}
          onChange={(e) => handleNutritionalChange(e, 'calories')}
        />
      </label>
      <br />

      <label>
        Proteins (g):
        <input
          type="number"
          value={formData.nutritionalValue.proteins}
          onChange={(e) => handleNutritionalChange(e, 'proteins')}
        />
      </label>
      <br />

      <label>
        Fats (g):
        <input
          type="number"
          value={formData.nutritionalValue.fats}
          onChange={(e) => handleNutritionalChange(e, 'fats')}
        />
      </label>
      <br />

      <label>
        Carbohydrates (g):
        <input
          type="number"
          value={formData.nutritionalValue.carbohydrates}
          onChange={(e) => handleNutritionalChange(e, 'carbohydrates')}
        />
      </label>
      <br />

      <label>
        Cellulose (g):
        <input
          type="number"
          value={formData.nutritionalValue.cellulose}
          onChange={(e) => handleNutritionalChange(e, 'cellulose')}
        />
      </label>
      <br />

      <button type="submit">Create Product</button>
    </form>
  )
}

export default CreateProductForm
