import Link from 'next/link'

const Card = ({
  title = '',
  subtitle = '',
  text = '',
  textButton = '',
  className = 'btn btn-primary',
  path = '/'
}) => {
  return (
    <div className='card w-100 p-3'>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{subtitle}</h6>
        <p className='card-text'>{text}</p>
        <Link type='button' href={path} className={className}>
          {textButton}
        </Link>
      </div>
    </div>
  )
}

export default Card
