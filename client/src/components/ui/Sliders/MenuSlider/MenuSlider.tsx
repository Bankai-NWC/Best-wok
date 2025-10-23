import { svgs } from '@/constants/svgs'
import { buildRoute } from '@/utils/buildRoute'
import CategoryButton from '@ui/Buttons/CategoryButton/CategoryButton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './MenuSlider.module.scss'

type MenuItem = {
  text: string
  imageSrc: string
  route: string
}

type MenuProps = {
  items: MenuItem[]
}

function MenuSlider({ items }: MenuProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { Arrow } = svgs
  const bntPrev = style.my_prev
  const bntNext = style.my_next

  return (
    <div className={style.swiper_wrapper}>
      <button className={bntPrev}>
        <Arrow />
      </button>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${bntPrev}`,
          nextEl: `.${bntNext}`,
        }}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={`${item.route}-${idx}`}>
            <CategoryButton
              text={t(item.text)}
              imageSrc={item.imageSrc}
              onClick={() => {
                navigate(buildRoute.catalog(item.route))
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={bntNext}>
        <Arrow className={style.flip_horizontal} />
      </button>
    </div>
  )
}

export default MenuSlider
