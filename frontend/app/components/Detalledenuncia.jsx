'use client'
import Link from 'next/link'
import ItemComentario from './ItemComentario'

const Detalledenuncia = ({
  denuncia = {},
  comentarios = [],
  contacto = {}
}) => {
  return (
    <div className='card'>
      <div className='card-header'>
        Denuncia: #{denuncia?.folio} | Estatus: {denuncia?.estatus}
      </div>
      <div className='card-body'>
        <p className='card-text'>
          Realizado por:{' '}
          {contacto?.anonimo === 1 ? contacto?.anonimo : 'Anonimo'}
        </p>
        <p className='card-text'>
          Detalle de la denuncia: {denuncia?.detalle_denuncia}
        </p>
        <h5>
          Comentarios:{' '}
          {comentarios.length === 0 &&
            'Aún no han hecho comentarios a esta denuncia.'}
        </h5>
        <div className='mt-3 list-group'>
          {comentarios?.map((comentario) => {
            return <ItemComentario key={comentario?.id} item={comentario} />
          })}
        </div>
        <div className='mt-3'>
          <Link href={'/'} className='btn btn-secondary'>
            Cerrar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Detalledenuncia
