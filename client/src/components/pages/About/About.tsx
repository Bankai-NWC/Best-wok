import AboutNumberCard from '@/components/ui/Cards/AboutNumberCard/AboutNumberCard'
import BenefitCard from '@/components/ui/Cards/BenefitCard/BenefitCard'
import { Picture } from '@/components/ui/Picture/Picture'
import { svgs } from '@/constants/svgs'
import team from '@assets/images/team.avif?as=picture&format=webp;avif;png&imagetools'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import style from './About.module.scss'

function About() {
  const { t } = useTranslation()

  const { Crown, Fish, Heart } = svgs

  const benefits = [
    {
      icon: Crown,
      description: t('pages.about_us.benefits._1'),
    },
    {
      icon: Fish,
      description: t('pages.about_us.benefits._2'),
    },
    {
      icon: Heart,
      description: t('pages.about_us.benefits._3'),
    },
  ]

  return (
    <>
      <Divider />
      <Box component={'section'} mt={6}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          textTransform={'uppercase'}
          sx={{ mt: 6, fontSize: { xs: 24, md: 34 } }}
        >
          {t('pages.about_us.title')}
        </Typography>
        <Stack direction="column">
          <Stack alignItems="center" mt={6}>
            <Picture
              src={team}
              alt="Our team"
              width={702}
              height={495}
              className={style['team-photo']}
            />
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography
              variant="h1"
              fontWeight={600}
              fontSize={{ xs: 48, md: 64 }}
              mt={4}
              className={style.title}
            >
              {t('pages.about_us.motto._1')}
            </Typography>
            <Typography variant="body1" fontWeight={600} mt={2} className={style.subtitle}>
              {t('pages.about_us.motto._2')}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="stretch"
            mt={16}
            gap={{ xs: 8, md: 6 }}
          >
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={`benefit.description.slice(0, 5)-${index}`}
                Icon={benefit.icon}
                description={benefit.description}
              />
            ))}
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            mt={{ xs: 12, md: 32 }}
            mb={{ xs: 4, md: 24 }}
            gap={16}
          >
            <Stack maxWidth={{ xs: '100%', md: '35%' }} gap={6}>
              <Typography variant="h2" fontSize={{ xs: 24, md: 42 }} fontWeight={600}>
                {t('pages.about_us.about_numbers.title')}
              </Typography>
              <Typography variant="body1" fontSize={{ xs: 16, md: 18 }} color="text.secondary">
                {t('pages.about_us.about_numbers.description')}
              </Typography>
            </Stack>
            <Stack direction="column" gap={12}>
              <Stack gap={8} direction="row">
                <AboutNumberCard value={7} description={t('pages.about_us.about_numbers._1')} />
                <AboutNumberCard value={200} description={t('pages.about_us.about_numbers._2')} />
              </Stack>
              <Stack flex={1} gap={8} direction="row">
                <AboutNumberCard
                  value={4}
                  unit={t('units.million')}
                  description={t('pages.about_us.about_numbers._3')}
                />
                <AboutNumberCard
                  value={28}
                  unit={t('units.minutes')}
                  description={t('pages.about_us.about_numbers._4')}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default About
