'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Link from 'next/link'
import SelectPaises from '../components/SelectPaises'
import SelectEstados from './SelectEstados'
import SelectEmpresas from './SelectEmpresas'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const FormularioDenuncia = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      anonimo: 'si',
      telefono: '',
      nombre_completo: '',
      correo_electronico: ''
    }
  })
  const watchAnonimo = watch('anonimo', 'si')
  const watchPaisSelected = watch('pais_id', null)
  const password = watch('password_seguimiento', '')
  const rePassword = watch('re_password_seguimiento', '')

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null)
  const [showDetalleDenuncia, setShowDetalleDenuncia] = useState(false)
  const [dataDetalleDenuncia, setDataDetalleDenuncia] = useState({})
  const [expanded, setExpanded] = useState(false)
  const localeText = {
    cancelButtonLabel: 'Cancelar',
    okButtonLabel: 'Aceptar',
    clearButtonLabel: 'Limpiar'
  }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const onSubmit = async (data) => {
    const params = {
      ...data,
      fecha_incidencia: fechaSeleccionada,
      anonimo: data?.anonimo === 'si',
      pais_id: data.pais_id?.value,
      empresa_id: data?.empresa_id?.value,
      estado_id: data?.estado_id?.value,
      telefono: data?.telefono?.toString() || ''
    }
    delete params.re_password_seguimiento
    const request = await fetch('http://localhost:9000/api/v1/denuncias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(params)
    })
    const response = await request.json()
    setDataDetalleDenuncia(response?.data)
    setTimeout(() => {
      setShowDetalleDenuncia(true)
    }, 100)
  }

  return (
    <div className='card'>
      <div className='card-header'>
        {showDetalleDenuncia ? 'Detalle denuncia' : 'Nueva denuncia'}
      </div>
      <div className='card-body'>
        {showDetalleDenuncia ? (
          <div className='jumbotron'>
            <h1 className='display-4'>Gracias por tu informacion!</h1>
            <p className='lead'>
              Agradecemos tu colaboracion para continuar mejorando nuestra
              cultura y ofrecerte un mejor servicio.
            </p>
            <hr className='my-4' />
            <p>
              Te compartimos los detalles para el seguimiento de tu denuncia.
            </p>
            <div className='card'>
              <div className='card-body'>
                Folio: # {dataDetalleDenuncia?.folio || ''}
              </div>
              <div className='card-body'>
                Contraseña: {dataDetalleDenuncia?.password_seguimiento || ''}
              </div>
            </div>
            <div className='mt-3'>
              <Link href='/' class='btn btn-secondary'>
                Volver
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Datos de la denuncia
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Selecciona el pais, estado e indica el numero de sucursal
                  donde sucedieron los hechos
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className='container'>
                  <div className='row'>
                    <div className='col-sm mt-3'>
                      <SelectPaises
                        Controller={Controller}
                        isClearable
                        noOptionsMessage={'Sin paises'}
                        placeholder={'Selecciona el pais'}
                        control={control}
                        className={'w-25'}
                        errors={errors}
                        name={'pais_id'}
                        rules={{ required: 'Debes seleccionar un pais' }}
                      />
                    </div>
                    {watchPaisSelected !== null && (
                      <>
                        <div className='col-sm mt-3'>
                          <SelectEstados
                            Controller={Controller}
                            isClearable
                            noOptionsMessage={'Sin estados'}
                            placeholder={'Selecciona el estado'}
                            control={control}
                            className={'w-25'}
                            errors={errors}
                            name={'estado_id'}
                            pais={watchPaisSelected}
                            rules={{ required: 'Debes seleccionar un estado' }}
                          />
                        </div>
                        <div className='col-sm mt-3'>
                          <SelectEmpresas
                            Controller={Controller}
                            isClearable
                            noOptionsMessage={'Sin empresas'}
                            placeholder={'Selecciona la empresa'}
                            control={control}
                            className={'w-25'}
                            errors={errors}
                            name={'empresa_id'}
                            rules={{
                              required: 'Debes seleccionar una empresa'
                            }}
                          />
                        </div>
                        <div className='col-sm mt-3'>
                          <Box
                            component='form'
                            sx={{
                              '& > :not(style)': { m: 1, width: '25ch' }
                            }}
                            noValidate
                            autoComplete='off'
                          >
                            <TextField
                              {...register('numero_centro', {
                                required:
                                  'Debes ingresar indicar el numero de centro'
                              })}
                              id='outlined-basic'
                              type='number'
                              placeholder='978621'
                              label='Ingresa el numero de centro'
                              variant='outlined'
                            />
                            {errors?.numero_centro && (
                              <p className='textfield_error'>
                                {errors?.numero_centro?.message}
                              </p>
                            )}
                          </Box>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel2bh-content'
                id='panel2bh-header'
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Contacto
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Ingresa tus datos para contactarte
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className='container'>
                  <div className='row'>
                    <Controller
                      control={control}
                      name={'anonimo'}
                      render={({ field }) => (
                        <div className='container_radios mt-2' {...field}>
                          <FormControl>
                            <FormLabel id='demo-radio-buttons-group-label'>
                              ¿Deseas realizar esta denuncia de forma anonima?
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby='demo-radio-buttons-group-label'
                              defaultValue='Si'
                              name='anonimo'
                              row
                            >
                              <FormControlLabel
                                value='si'
                                control={<Radio />}
                                label='Si'
                              />
                              <FormControlLabel
                                value='no'
                                control={<Radio />}
                                label='No'
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                    />
                    {errors?.anonimo && (
                      <p className='textfield_error'>
                        {errors?.anonimo?.message}
                      </p>
                    )}
                  </div>
                  {watchAnonimo === 'no' && (
                    <Box
                      component='form'
                      sx={{
                        '& > :not(style)': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete='off'
                    >
                      <TextField
                        {...register('nombre_completo', {
                          required: 'Debes ingresar tu nombre completo'
                        })}
                        id='outlined-basic'
                        type='text'
                        label='Nombre completo'
                        variant='outlined'
                      />
                      {errors?.nombre_completo && (
                        <p className='textfield_error'>
                          {errors?.nombre_completo?.message}
                        </p>
                      )}
                      <TextField
                        {...register('correo_electronico', {
                          required: 'Debes ingresar tu telefono'
                        })}
                        id='outlined-basic'
                        type='email'
                        placeholder='example@example.com'
                        label='Correo de contacto'
                        variant='outlined'
                      />
                      {errors?.correo_electronico && (
                        <p className='textfield_error'>
                          {errors?.correo_electronico?.message}
                        </p>
                      )}
                      <TextField
                        {...register('telefono', {
                          required: 'Debes ingresar tu telefono'
                        })}
                        id='outlined-basic'
                        type='number'
                        placeholder='+52'
                        label='Telefono de contacto'
                        variant='outlined'
                      />
                      {errors?.telefono && (
                        <p className='textfield_error'>
                          {errors?.telefono?.message}
                        </p>
                      )}
                    </Box>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel3bh-content'
                id='panel3bh-header'
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Detalle de denuncia
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Escribe detalladamente lo sucedido e indicanos la fecha en que
                  sucedido
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  localeText={localeText}
                >
                  <DesktopDatePicker
                    label={'Fecha'}
                    onChange={(newValue) => {
                      setFechaSeleccionada(
                        newValue?._d
                          ? new moment(Date(newValue?._d)).format('YYYY-MM-DD')
                          : null
                      )
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {fechaSeleccionada === null && (
                    <p className='textfield_error'>
                      Debes seleccionar una fecha
                    </p>
                  )}
                </LocalizationProvider>
                {fechaSeleccionada !== null && (
                  <div className='mt-3'>
                    <p>Escribe detalladamente lo sucedido</p>
                    <textarea
                      {...register('detalle_denuncia', {
                        required: 'Debes describir detalladamente lo sucedido'
                      })}
                      placeholder='Escribe algo...'
                      className='form-control'
                      id='exampleFormControlTextarea1'
                      rows='3'
                    ></textarea>
                    {errors?.detalle_denuncia && (
                      <p className='textfield_error'>
                        {errors?.detalle_denuncia?.message}
                      </p>
                    )}
                  </div>
                )}
                <div className='mt-3'>
                  <h5 className='card-title  d-flex justify-content-center'>
                    Crea una contraseña de seguimiento
                  </h5>
                  <div className='d-flex justify-content-center'>
                    <div className='p-4'>
                      <TextField
                        {...register('password_seguimiento', {
                          required: 'Debes ingresar una contraseña'
                        })}
                        id='outlined-basic'
                        type='password'
                        placeholder='******'
                        label='Contraseña'
                        variant='outlined'
                      />
                      {errors?.password_seguimiento && (
                        <p className='textfield_error'>
                          {errors?.password_seguimiento?.message}
                        </p>
                      )}
                    </div>
                    <div className='p-4'>
                      <TextField
                        {...register('re_password_seguimiento', {
                          required: 'Debes confirmar la contraseña'
                        })}
                        id='outlined-basic'
                        type='password'
                        placeholder='******'
                        label='Escribe de nuevo la contraseña'
                        variant='outlined'
                      />
                      {errors?.re_password_seguimiento && (
                        <p className='textfield_error'>
                          {errors?.re_password_seguimiento?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <div className='mt-3'>
              <button
                type='submit'
                className='btn btn-success'
                disabled={password !== rePassword}
              >
                Enviar
              </button>

              <Link href='/' className='btn btn-danger'>
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default FormularioDenuncia
