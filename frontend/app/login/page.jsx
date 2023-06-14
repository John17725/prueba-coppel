'use client'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../HomePage.module.css'
import Container from '../components/Container'
import {
  saveLocalStorage,
  deleteLocalStorage,
  validateSession
} from '../../utils'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onSubmit = async (data) => {
    deleteLocalStorage('user')
    const request = await fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    const response = await request.json()
    if (response?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: response?.message
      })
    } else {
      saveLocalStorage('user', {
        usuario: { ...response?.usuario },
        token: response?.access_token
      })
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido!',
        text: response?.message
      }).then((response) => {
        router.push('/administrador')
      })
    }
  }

  useEffect(() => {
    const user = validateSession()
    if (user) {
      router.push('/administrador')
    }
  }, [])

  return (
    <Container>
      <h1 className={styles.title}>Iniciar sesion</h1>
      <div className='mt-3 container'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <FormControl sx={{ m: 0, width: '100%' }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-password'>
                    Usuario
                  </InputLabel>
                  <FilledInput
                    {...register('nombre', {
                      required: 'Debes ingresar tu usuario'
                    })}
                    error={errors?.nombre ? true : false}
                    id='filled-adornment-username'
                    type={'text'}
                  />
                  {errors?.nombre && (
                    <p className='textfield_error'>{errors?.nombre?.message}</p>
                  )}
                </FormControl>
              </div>
              <div className='mb-3'>
                <FormControl sx={{ m: 0, width: '100%' }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-password'>
                    Password
                  </InputLabel>
                  <FilledInput
                    {...register('password', {
                      required: 'Debes ingresar tu contraseña'
                    })}
                    id='filled-adornment-password'
                    error={errors?.password ? true : false}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors?.password && (
                    <p className='textfield_error'>
                      {errors?.password?.message}
                    </p>
                  )}
                </FormControl>
              </div>
              <div className='d-flex justify-content-end'>
                <button
                  type='submit'
                  className='btn btn-primary d-flex justify-content-end'
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}
