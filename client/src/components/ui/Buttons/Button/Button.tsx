import { Stack, Typography } from '@mui/material'
import style from './Button.module.scss'

type Props = {
  type?: 'outlined' | 'contained'
  text?: string
  symbol?: string
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  onClick?: () => void
}

function CustomeButton({ type, text, symbol, icon: Icon, onClick }: Props) {
  const textIncludes = !!text

  return (
    <button className={type === 'outlined' ? style.outlined : style.contained} onClick={onClick}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '24px', minWidth: '24px' }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          {Icon && <Icon />}
          {textIncludes && (
            <Stack direction="row" alignItems="baseline" gap={1}>
              {text && (
                <Typography className={style.text} variant="body1" color="text.primary">
                  {text}
                </Typography>
              )}
              {symbol && (
                <Typography className={style.text} variant="body2" color="text.primary">
                  {symbol}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </button>
  )
}

export default CustomeButton
