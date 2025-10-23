import { PromoSliderProps } from '@/types'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './PromoSlider.module.scss'

function PromoSlider({ slides }: PromoSliderProps) {
  return (
    <Swiper
      style={{ borderRadius: 16 }}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {slides?.map((slide) => (
        <SwiperSlide key={slide.image}>
          <Link to={slide.link || '#'}>
            <img src={slide.image} alt={slide.alt} className={style.slideImg} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PromoSlider
