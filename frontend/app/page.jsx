import Card from './components/Card'
import Title from './components/Title'

export default function HomePage() {
  return (
    <main className='p-4'>
      <Title />
      <div className='w-100 d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-center p-3'>
          <div className='p-3'>
            <Card
              title={'Denuncia'}
              text={
                'Reporta algún tipo de mal comportamiento que hayas presenciado'
              }
              textButton={'Realizar denuncia'}
            />
          </div>
          <div className='p-3'>
            <Card
              title={'Seguimiento'}
              text={'Consulta el estado de la denuncia que hayas realizado'}
              textButton={'Ver seguimiento'}
              className={'btn btn-info'}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
