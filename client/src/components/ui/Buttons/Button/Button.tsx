import { CustomButtonProps } from '@/types'
import { Stack, Typography } from '@mui/material'
import style from './Button.module.scss'

function CustomeButton({ type, maxWidth, text, symbol, icon: Icon, onClick }: CustomButtonProps) {
  const textIncludes = !!text

  return (
    <button
      className={type === 'outlined' ? style.outlined : style.contained}
      style={{ maxWidth: maxWidth ? maxWidth : '100%' }}
      onClick={onClick}
    >
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
                <Typography
                  className={style.text}
                  variant="body1"
                  fontWeight={600}
                  color="text.primary"
                >
                  {text}
                </Typography>
              )}
              {symbol && (
                <Typography
                  className={style.text}
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
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
