import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilFolder, cilTrash, cilPencil, cilPlus } from '@coreui/icons'
import reactImg from 'src/assets/images/react.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const navigate = useNavigate()
  const url = window.location.href
  const match = url.match(/[?&]code=([^#&]+)/)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const apiKey = localStorage.getItem('apiKey')

    if (!token) {
      navigator('/login')
      return
    }

    if (!match) {
      toast.error('No estás conectad@ a MELI')
      return
    }

    if (apiKey != null) {
      fetch('https://100.27.84.204:8085/ventas', {
        headers: {
          'Content-Type': 'application/json',
          'X-userToken': localStorage.getItem('token'),
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error al obtener ventas')
          return res.json()
        })
        .then((data) => {
          setVentas(data)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            Listado de Ventas{' '}
            <CButton color="success" onClick={() => navigate('/ventas/add')} className="mx-3">
              <CIcon icon={cilPlus} /> Agregar
            </CButton>{' '}
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">ID</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Fecha
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Precio
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Items
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Borrar
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Modificar
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ventas.map((venta, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">{venta.id}</CTableDataCell>
                    <CTableDataCell className="text-center">{venta.fecha}</CTableDataCell>
                    <CTableDataCell className="text-center">{venta.precioTotal}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead className="text-nowrap">
                          <CTableRow>
                            <CTableHeaderCell className="bg-body-tertiary">
                              Producto
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-center">
                              Cantidad
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {venta.items.map((item, idx) => (
                            <CTableRow key={idx}>
                              <CTableDataCell>{item.producto.nombre}</CTableDataCell>
                              <CTableDataCell className="text-center">
                                {item.cantidad}
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('¿Estás seguro que querés eliminar esta venta?')) {
                            fetch('https://100.27.84.204:8085/ventas', {
                              method: 'DELETE',
                              headers: {
                                'Content-Type': 'application/json',
                                'X-userToken': localStorage.getItem('token'),
                              },
                              body: JSON.stringify(venta),
                            })
                              .then((res) => {
                                if (!res.ok) throw new Error('Error al eliminar')
                                toast.success('Venta eliminada')
                                setVentas(ventas.filter((p) => p.id !== venta.id))
                              })
                              .catch((err) => toast.error('No se pudo eliminar'))
                          }
                        }}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/ventas/update?id=${venta.id}`)}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Ventas
