import Title from '../components/Title'
import Container from '../components/Container'
import FormularioDenuncia from '../components/FormularioDenuncia'

export default function DenunciaPage() {
  return (
    <Container>
      <Title />
      <div className='mt-3'>
        <FormularioDenuncia />
      </div>
    </Container>
  )
}
