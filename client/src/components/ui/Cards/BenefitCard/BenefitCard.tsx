import { Stack, Typography } from '@mui/material'
import { FunctionComponent, SVGProps } from 'react'
import style from './BenefitCard.module.scss'

type Props = {
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
      titleId?: string
      desc?: string
      descId?: string
    }
  >
  description: string
}

function BenefitCard({ Icon, description }: Props) {
  return (
    <Stack className={style.card}>
      <Icon width={64} className={style.icon} />
      <Typography>{description}</Typography>
    </Stack>
  )
}

export default BenefitCard
