'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter, useParams } from 'next/navigation'
import { validateSession } from '../../../utils'
import Container from '../../components/Container'
import ItemComentario from '../../components/ItemComentario'
import CommentIcon from '@mui/icons-material/Comment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import FormularioComentario from './FormularioComentario'
import SelectEstatus from './SelectEstatus'
import Link from 'next/link'

export default function DenunciaItemPage() {
  const router = useRouter()
  const [comentarios, setComentarios] = useState([])
  const [showComentarios, setShowComentarios] = useState(true)
  const [nuevoEstatusSelected, setNuevoEstatusSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSelectStatus, setShowSelectStatus] = useState(false)
  const [dataDenuncia, setDataDenuncia] = useState({})
  const [user, setUser] = useState({})
  const { id } = useParams()
  const closeComment = () => {
    setShowComentarios((state) => !state)
  }
  const getComentarios = async (user, idDenuncia) => {
    const request = await fetch(
      'http://localhost:9000/api/v1/comentarios-denuncia/' + idDenuncia,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    const response = await request.json()
    setComentarios(response?.data || [])
    setIsLoading(false)
  }

  const getDenuncia = async (user, id) => {
    setIsLoading(true)
    const request = await fetch(
      'http://localhost:9000/api/v1/denuncias/' + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      }
    )
    const response = await request.json()
    if (response?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text:
          'Ha ocurrido un error al consultar las denuncia: ' + response?.message
      })
      router.push('/administrador')
    } else {
      setDataDenuncia(response?.data)
    }
  }
  const changeEstatus = async () => {
    const params = {
      estatus: nuevoEstatusSelected?.value,
      folio: dataDenuncia?.folio
    }
    const request = await fetch(
      'http://localhost:9000/api/v1/denuncias/' + id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(params)
      }
    )
    const response = await request.json()
    setShowSelectStatus((state) => !state)
    getDenuncia(user, id)
    if (!response?.error) {
      Swal.fire({
        icon: 'success',
        title: 'Cambio exitoso!',
        text: response?.message
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error!',
        text: 'No se pudo actualizar el estatus'
      })
    }
  }
  const sendComentario = async (data) => {
    const params = {
      ...data,
      denuncia_id: id
    }
    const request = await fetch(
      'http://localhost:9000/api/v1/comentarios-denuncia',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(params)
      }
    )
    const response = await request.json()
    getComentarios(user, id)
    if (response?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Ha ocurrido un error al realziar el comentario'
      })
      closeComment()
    }
    if (!response?.error) {
      Swal.fire({
        icon: 'success',
        title: 'Comentario enviado!',
        text: 'Comentario realizado exitosamente'
      })
      closeComment()
    }
  }
  useEffect(() => {
    const user = validateSession()
    setUser(user)
    if (!user) {
      router.push('/')
    }
    getDenuncia(user, id)
    getComentarios(user, id)
  }, [id])

  return (
    <Container>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <div>
            Denuncia: # {dataDenuncia?.folio} | Estatus: {dataDenuncia?.estatus}
          </div>
          <div>
            {showSelectStatus ? (
              <div className='d-flex'>
                <div>
                  <SelectEstatus
                    onChange={(event) => {
                      setNuevoEstatusSelected(event)
                    }}
                  />
                </div>
                <div>
                  <IconButton
                    color='success'
                    aria-label='add to shopping cart'
                    disabled={nuevoEstatusSelected === null}
                    onClick={() => {
                      changeEstatus()
                    }}
                  >
                    <DoneIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    color='error'
                    aria-label='add to shopping cart'
                    onClick={() => {
                      setShowSelectStatus((state) => !state)
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <Button
                color='warning'
                onClick={() => {
                  setShowSelectStatus((state) => !state)
                }}
              >
                Cambiar estatus
              </Button>
            )}
          </div>
        </div>

        <div className='card-body'>
          <div className='card'>
            <div className='card-body'>
              <h6 className='card-title'>Datos del denunciante</h6>
              <p>
                Nombre:{' '}
                {dataDenuncia?.contacto?.anonimo === 1
                  ? 'Esta denuncia fue realizada anonimamente'
                  : dataDenuncia?.contacto?.nombre_completo || ''}{' '}
              </p>
              <p>
                Correo electronico:{' '}
                {dataDenuncia?.contacto?.correo_electronico || ''}{' '}
              </p>
              <p>Telefono: {dataDenuncia?.contacto?.telefono || ''}</p>
            </div>
          </div>
          <div className='card mt-3'>
            <div className='card-body'>
              <p>Detalle de la denuncia:</p>
              <p className='card-text'>DSAFSDASFSADFSDFASDFSDAF</p>
            </div>
          </div>
          {showComentarios ? (
            <div className='mt-3 card'>
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <h6 className='card-text'>
                    Comentarios:{' '}
                    {comentarios.length === 0 &&
                      'Aún no han hecho comentarios a esta denuncia.'}
                  </h6>
                  {dataDenuncia?.estatus === 'Abierto' && (
                    <div>
                      <IconButton
                        color='primary'
                        aria-label='add to shopping cart'
                        onClick={() => {
                          setShowComentarios((state) => !state)
                        }}
                      >
                        <CommentIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
                <div className='list-group'>
                  {comentarios?.map((comentario) => {
                    return (
                      <ItemComentario key={comentario?.id} item={comentario} />
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className='card mt-3'>
              <div className='card-body'>
                <h6 className='card-text'>
                  Escribe un comentario para dar seguimiento
                </h6>
                <div className='mt-2'>
                  <FormularioComentario
                    onChange={sendComentario}
                    onClose={() => {
                      setShowComentarios((state) => !state)
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className='mt-3'>
            <Link href={'/administrador'} className='btn btn-secondary'>
              Volver al panel
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
