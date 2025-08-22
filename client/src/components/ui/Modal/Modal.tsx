import { useTranslation } from 'react-i18next'
import style from './Modal.module.scss'

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Modal({ setIsModalOpen }: Props) {
  const { i18n } = useTranslation()

  function handleChangeLanguage() {
    const newLanguage = i18n.language === 'en' ? 'ua' : 'en'
    i18n.changeLanguage(newLanguage)
    setIsModalOpen((prev) => !prev)
  }

  return (
    <div className={style.modal}>
      <button className={style.button} onClick={handleChangeLanguage}>
        {i18n.language === 'en' ? 'UA' : 'EN'}
      </button>
    </div>
  )
}

export default Modal
