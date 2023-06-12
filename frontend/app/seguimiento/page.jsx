'use client'
import { useState } from 'react'
import Title from '../components/Title'
import Container from '../components/Container'
import FormularioSeguimiento from '../components/FormularioSeguimiento'
import Detalledenuncia from '../components/Detalledenuncia'
import Skeleton from '@mui/material/Skeleton'

export default function SeguimientoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [viewForm, setViewForm] = useState(true)
  const [dataDenuncia, setDataDenuncia] = useState({
    data: {},
    exist: false
  })
  const [comentariosDenuncia, setComentariosDenuncia] = useState([])
  const [contacto, setContacto] = useState({})
  const getContacto = async(idDenuncia) =>{
    const request = await fetch(
      'http://localhost:9000/api/v1/contacto/' + idDenuncia,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    const response = await request.json()
    setContacto(response?.data[0])
  }
  const getComentarios = async (idDenuncia) => {
    const request = await fetch(
      'http://localhost:9000/api/v1/comentarios-denuncia/' + idDenuncia,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    const response = await request.json()
    setComentariosDenuncia(response?.data || [])
    setIsLoading(false)
  }

  const getSeguimiento = async (data) => {
    setViewForm(false)
    setDataDenuncia({ ...dataDenuncia })
    setIsLoading(true)
    const request = await fetch(
      'http://localhost:9000/api/v1/obtener-seguimiento',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    const response = await request.json()
    if (response?.data[0]?.id) {
      getContacto(response?.data[0]?.id)
      getComentarios(response?.data[0]?.id)
      setDataDenuncia({ ...dataDenuncia, data: response?.data[0], exist: true })
    } else {
      setIsLoading(false)
    }
  }
  return (
    <Container>
      <Title title={'Seguimiento de denuncia'} />
      {isLoading ? (
        <Skeleton variant='rounded' width={'100%'} height={400} />
      ) : (
        <>
          {!viewForm && (
            <>
              {dataDenuncia?.exist ? (
                <Detalledenuncia
                  denuncia={dataDenuncia?.data}
                  comentarios={comentariosDenuncia}
                  contacto={contacto}
                />
              ) : (
                <>No existe</>
              )}
            </>
          )}
          {viewForm && (
            <div className='d-flex justify-content-center align-items-center'>
              <FormularioSeguimiento onChange={getSeguimiento} />
            </div>
          )}
        </>
      )}
    </Container>
  )
}
