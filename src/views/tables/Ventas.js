import React, { useEffect } from 'react'
import classNames from 'classnames'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilFolder } from '@coreui/icons'
import react from 'src/assets/images/react.jpg'

const Ventas = () => {
  const tableExample = [
    {
      fecha: '01/10/2023',
      precio: '$1200',
      items_venta: [
        {
          producto: { nombre: 'Producto de nombre Ejemplo' },
          cantidad: '12',
          foto: { src: react },
        },
      ],
    },
  ]

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
                {tableExample.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <div>{item.idMeli}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item.fecha}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.precio}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CTable align="middle" className="mb-0 border" hover responsive>
                        <CTableHead className="text-nowrap">
                          <CTableRow>
                            <CTableHeaderCell className="bg-body-tertiary">
                              Producto
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-center">
                              <CIcon icon={cilImage} />
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                              Cantidad
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {item.items_venta.map((categoria, idx) => (
                            <CTableRow key={idx}>
                              <CTableDataCell>
                                <div>{categoria.producto.nombre}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <CAvatar size="md" src={categoria.foto.src} />
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{categoria.cantidad}</div>
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {item.idMeli != null ? <div>No es Local</div> : <div>Local</div>}
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
