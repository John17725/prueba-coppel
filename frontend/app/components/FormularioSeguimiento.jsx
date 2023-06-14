'use client'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

const FormularioSeguimiento = ({ onChange = () => {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    onChange(data)
  }
  return (
    <div className='card w-50'>
      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3 row'>
            <label htmlFor='inputPassword' className='  col-form-label'>
              Folio
            </label>
            <div className='col-sm-6'>
              <input
                {...register('folio', { required: 'El folio es obligatorio' })}
                type='number'
                className='form-control'
                id='inputPassword'
              />
              {errors?.folio && (
                <p className='textfield_error'>{errors?.folio?.message}</p>
              )}
            </div>
          </div>
          <div className='mb-3 row'>
            <label htmlFor='inputPassword' className='col-sm-6 col-form-label'>
              Contraseña de seguimiento
            </label>
            <div className='col-sm-10'>
              <input
                {...register('password_seguimiento', {
                  required: 'La contraseña es obligatoria'
                })}
                type='password'
                className='form-control'
                id='inputPassword'
              />
              {errors?.password_seguimiento && (
                <p className='textfield_error'>
                  {errors?.password_seguimiento?.message}
                </p>
              )}
            </div>
          </div>
          <div className='d-flex  mt-3'>
            <button type='submit' className='btn btn-success m-2'>
              Enviar
            </button>
            <Link href='/' class='btn btn-secondary m-2'>
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioSeguimiento
