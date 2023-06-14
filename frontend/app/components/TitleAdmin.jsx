'use client'
import { useRouter } from 'next/navigation'
import { deleteLocalStorage } from '../../utils'
import styles from '../HomePage.module.css'

const TitleAdmin = ({ title = 'LÍNEA DE DENUNCIA' }) => {
  const router = useRouter()
  const cerrarSesion = () => {
    deleteLocalStorage('user')
    router.push('/')
  }
  return (
    <div className='d-flex w-100 justify-content-between'>
      <h1 className={styles.title}>{title}</h1>
      <ul className='nav'>
        <li className='nav-item'>
          <button
            onClick={() => {
              cerrarSesion()
            }}
            className='nav-link active'
          >
            Cerrar sesion
          </button>
        </li>
      </ul>
    </div>
  )
}

export default TitleAdmin
