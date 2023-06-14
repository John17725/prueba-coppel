import styles from '../HomePage.module.css'
import Link from 'next/link'

const Title = ({ title = 'LÍNEA DE DENUNCIA' }) => {
  return (
    <div className='d-flex w-100 justify-content-between'>
      <h1 className={styles.title}>{title}</h1>
      <ul className='nav'>
        <li className='nav-item'>
          <Link className='nav-link active' href='/login'>
            Iniciar sesion
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Title
