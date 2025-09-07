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
import { cilImage, cilFolder } from '@coreui/icons'
import reactImg from 'src/assets/images/react.jpg'
import { useNavigate } from 'react-router-dom'

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
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
        console.log(data)
        setVentas(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Listado de Ventas</CCardHeader>
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
                    <CIcon icon={cilFolder} />
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ventas.map((venta, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">{venta.id}</CTableDataCell>
                    <CTableDataCell className="text-center">{venta.fecha}</CTableDataCell>
                    <CTableDataCell className="text-center">{venta.precio}</CTableDataCell>
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
                      {venta.id ? (
                        <div className="badge bg-danger">No es Local</div>
                      ) : (
                        <div className="badge bg-success">Local</div>
                      )}
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
