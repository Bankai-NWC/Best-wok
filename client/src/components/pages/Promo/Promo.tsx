import { PromoImages } from '@/constants/images'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import style from './Promo.module.scss'

function Promo() {
  const { t } = useTranslation()

  const { promoGifts, happyBirthday, tickets } = PromoImages

  return (
    <>
      <Divider />
      <Box>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          textTransform={'uppercase'}
          sx={{ mt: 6, fontSize: { xs: 24, md: 34 } }}
        >
          {t('pages.promo.title')}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={6} mt={6}>
          <Stack className={style.wrapper} flex={1}>
            <img src={promoGifts} alt="Gift" />
          </Stack>
          <Stack flex={2}>
            <Typography
              variant="h2"
              fontSize={28}
              fontWeight={500}
              className={style['text-accent']}
            >
              {t('pages.promo.gifts.title')}
            </Typography>
            <Stack mt={4}>
              <Typography variant="body1">{t('pages.promo.gifts.description._1')}</Typography>
              <Typography variant="body1" mt={4}>
                {t('pages.promo.gifts.description._2')}
              </Typography>
              <Typography variant="body1">
                <Typography variant="body1" component={'span'} className={style['text-accent']}>
                  {t('pages.promo.gifts.scratch_card._1')}
                </Typography>{' '}
                {t('pages.promo.gifts.order_from')} <b>{t('pages.promo.gifts.scratch_card._2')}</b>
              </Typography>
              <Typography variant="body1">
                {t('pages.promo.gifts.set_rolls._1')}{' '}
                <Typography variant="body1" component={'span'} className={style['text-accent']}>
                  {t('pages.promo.gifts.set_rolls._2')}
                </Typography>{' '}
                {t('pages.promo.gifts.order_from')} <b>{t('pages.promo.gifts.set_rolls._3')}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={6}>
                {t('pages.promo.gifts.notice')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row-reverse' }} gap={6} mt={12}>
          <Stack className={style.wrapper} flex={1}>
            <img src={happyBirthday} alt="Happy Birthday" />
          </Stack>
          <Stack flex={2}>
            <Typography
              variant="h2"
              fontSize={28}
              fontWeight={500}
              className={style['text-accent']}
            >
              {t('pages.promo.birthday.title')}
            </Typography>
            <Stack mt={4}>
              <Typography variant="body1">{t('pages.promo.birthday.description._1')}</Typography>
              <Typography variant="body1" mt={4}>
                {t('pages.promo.birthday.description._2')}
              </Typography>
              <Typography variant="body1" ml={6}>
                {t('pages.promo.birthday.instructions')}
              </Typography>
              <Typography variant="body1" mt={4}>
                {t('pages.promo.birthday.description._3')}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={6}>
                {t('pages.promo.birthday.notice')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={6} mt={12}>
          <Stack className={style.wrapper} flex={1}>
            <img src={tickets} alt="Tickets" />
          </Stack>
          <Stack flex={2}>
            <Typography
              variant="h2"
              fontSize={28}
              fontWeight={500}
              className={style['text-accent']}
            >
              {t('pages.promo.certificates.title')}
            </Typography>
            <Stack mt={4}>
              <Typography variant="body1">{t('pages.promo.certificates.description')}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Promo
