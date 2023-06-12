import styles from '../HomePage.module.css'

const Title = ({ title = 'LÍNEA DE DENUNCIA' }) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}

export default Title
