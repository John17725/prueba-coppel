'use client'
import Swal from 'sweetalert2'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { validateSession, formatDatesCalendar } from '../../utils'
import Container from '../components/Container'
import TitleAdmin from '../components/TitleAdmin'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'

export default function AdminPage() {
  const router = useRouter()
  const [dataUser, setDataUser] = useState({})
  const [dataDenuncias, setDataDenuncias] = useState([])
  const columns = [
    { field: 'folio', headerName: 'Folio', width: 80 },
    { field: 'anonimoDenuncia', headerName: 'Anonimo', width: 130 },
    { field: 'nombrePais', headerName: 'Pais', width: 130 },
    { field: 'nombreEstado', headerName: 'Estado', width: 130 },
    { field: 'nombreEmpresa', headerName: 'Empresa', width: 130 },
    { field: 'numeroCentro', headerName: 'No. Sucursal', width: 130 },
    { field: 'estatus', headerName: 'Estado denuncia', width: 130 },
    { field: 'createdDenuncia', headerName: 'Fecha de creacion', width: 160 },
    { field: 'ultimaActividad', headerName: 'Ultima actualizacion', width: 200 }
  ]
  const getDataDenuncias = async (user) => {
    const request = await fetch('http://localhost:9000/api/v1/denuncias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`
      }
    })
    const response = await request.json()
    if (response?.error || response?.message === 'Unauthenticated.') {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text:
          'Ha ocurrido un error al consultar las denuncias ' + response?.message
      })
      router.push('/login')
    } else {
      const swapData = response?.data?.map((denuncia) => {
        return {
          ...denuncia,
          anonimoDenuncia: denuncia?.contacto?.anonimo === 1 ? 'Si' : 'No',
          nombrePais: denuncia?.paisId?.nombrePais,
          nombreEstado: denuncia?.estadoId?.nombre,
          nombreEmpresa: denuncia?.empresaId?.nombre,
          createdDenuncia: moment(denuncia?.createdAt).format('YYYY-MM-DD'),
          ultimaActividad: moment(denuncia?.createdAt).isSame(
            moment(denuncia?.updatedAt)
          )
            ? 'Sin actualizaciones'
            : moment(new Date(denuncia?.updatedAt)).calendar(
                null,
                formatDatesCalendar
              ),
          nombreDenunciante:
            denuncia?.contacto?.anonimo === 1
              ? denuncia?.contacto?.nombre_completo
              : 'Anonimo'
        }
      })
      setDataDenuncias(swapData)
    }
  }

  useEffect(() => {
    const user = validateSession()
    setDataUser(user)
    if (!user) {
      router.push('/login')
    }
    getDataDenuncias(user)
  }, [])

  return (
    <Container>
      <TitleAdmin title={'Denuncias'} />
      <div className='container mt-3 w-100'>
        <div className='card'>
          <div className='card-body'>
            <h2>Lista de denuncias</h2>
            <div style={{ height: 640, width: '100%' }}>
              <DataGrid
                onRowClick={(event) => {
                  router.push('/administrador/' + event?.row?.id)
                }}
                rows={dataDenuncias}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10, 20, 50, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
