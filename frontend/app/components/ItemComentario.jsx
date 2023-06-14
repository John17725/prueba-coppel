import moment from 'moment'

const ItemComentario = ({ item = {} }) => {
  const formatDatesCalendar = {
    sameDay: '[Hoy a las] h:mm a',
    nextDay: '[Mañana a las] h:mm a',
    nextWeek: 'dddd [a las] h:mm a',
    lastDay: '[Ayer a las] h:mm a',
    lastWeek: '[El] dddd [pasado a las] h:mm a',
    sameElse: 'dddd D MMMM [del] YYYY [a las] h:mm a'
  }
  return (
    <div className='list-group-item list-group-item-action'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>Admin: </h5>
        <small>
          {moment(new Date(item?.createdAt) || new Date()).calendar(
            null,
            formatDatesCalendar
          )}
        </small>
      </div>
      <p className='mb-1'>{item?.comentario_denuncia}</p>
    </div>
  )
}

export default ItemComentario
