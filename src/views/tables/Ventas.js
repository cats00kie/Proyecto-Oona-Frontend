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
    fetch('http://localhost:8085/ventas', {
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
        // Mapear items_venta para asegurar foto y producto
        const mappedData = data.map((venta) => ({
          ...venta,
          items_venta: venta.items_venta.map((item) => ({
            producto: item.producto,
            cantidad: item.cantidad,
            foto: { src: item.foto?.src || reactImg },
          })),
        }))
        setVentas(mappedData)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            Listado de Ventas
            {/* Botón de acción ejemplo */}
            {/* <CButton color="success" className="float-end" onClick={() => navigate('/ventas/add')}>
              ➕ Agregar Venta
            </CButton> */}
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">ID</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Fecha</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Precio</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Items</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    <CIcon icon={cilFolder} />
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ventas.map((venta, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">{venta.idMeli ?? venta.id}</CTableDataCell>
                    <CTableDataCell className="text-center">{venta.fecha}</CTableDataCell>
                    <CTableDataCell className="text-center">{venta.precio}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead className="text-nowrap">
                          <CTableRow>
                            <CTableHeaderCell className="bg-body-tertiary">Producto</CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-center">
                              <CIcon icon={cilImage} />
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-center">Cantidad</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {venta.items_venta.map((item, idx) => (
                            <CTableRow key={idx}>
                              <CTableDataCell>{item.producto.nombre}</CTableDataCell>
                              <CTableDataCell className="text-center">
                                <CAvatar size="md" src={item.foto.src} />
                              </CTableDataCell>
                              <CTableDataCell className="text-center">{item.cantidad}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {venta.idMeli != null ? <div>No es Local</div> : <div>Local</div>}
                      {/* Ejemplo botones de acción */}
                      {/* <CButton
                        color="warning"
                        size="sm"
                        className="mt-1"
                        onClick={() => navigate(`/ventas/update/${venta.id}`)}
                      >
                        ✏️ Modificar
                      </CButton> */}
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
