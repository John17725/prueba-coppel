'use client'
import { useForm } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'

export const FormularioComentario = ({
  onChange = () => {},
  onClose = () => {}
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  return (
    <form onSubmit={handleSubmit(onChange)}>
      <div className='form-floating'>
        <textarea
          {...register('comentario_denuncia', {
            required: 'Debes escribir algo'
          })}
          className='form-control'
          placeholder='Leave a comment here'
          id='floatingTextarea'
          style={{ height: '100px' }}
        />
        <label htmlFor='floatingTextarea'>Comentario</label>
        <div className='d-flex justify-content-between'>
          <div>
            {errors?.comentario_denuncia && (
              <p className='textfield_error'>
                {errors?.comentario_denuncia?.message}
              </p>
            )}
          </div>
          <div>
            <IconButton
              onClick={() => {
                onClose()
              }}
              className='m-2'
              type='button'
              color='primary'
              aria-label='add to shopping cart'
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              className='m-2'
              type='submit'
              color='primary'
              aria-label='add to shopping cart'
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FormularioComentario
