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
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFactory, cilUser, cilStorage, cilImage, cilFolder, cilTrash, cilPencil, cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Stock = () => {
  const [stocks, setStocks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://100.27.84.204:8085/stocks', {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener stocks')
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setStocks(data)
      })
      .catch((err) => console.error(err))
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    if (isNaN(date)) return 'Fecha inválida'
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${date.getFullYear()}`
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Listado {' de '} Stock <CButton color="success" onClick={() => navigate('/proveedores/add')} className="mx-3">
                          <CIcon icon={cilPlus}/> Agregar
                        </CButton> </CCardHeader>
            <CCardBody>
              <CTable
                align="center"
                className="mb-4 border border-secondary table-striped table-hover table-dark"
                responsive
              >
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="fw-bold text-center">ID</CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilFactory} /> Proveedor
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilUser} /> Producto
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilImage} /> Foto
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">Descripción</CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilStorage} /> Cantidad
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilFolder} /> Precios
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {stocks != null && (
                  <CTableBody>
                    {stocks.map((item, index) => (
                      <CTableRow key={index} className="align-middle">
                        <CTableDataCell className="text-center">{item.id}</CTableDataCell>

                        <CTableDataCell className="text-center">
                          {item.proveedor?.razonSocial ?? '-'}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          {item.producto?.nombre ?? '-'}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={item.producto?.urlFoto} />
                        </CTableDataCell>

                        <CTableDataCell className="text-center text-wrap">
                          {item.producto?.descripcion ?? '-'}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">{item.cantidad}</CTableDataCell>

                        <CTableDataCell className="text-center">
                          <CTable
                            align="center"
                            className="table-sm table-dark table-bordered mb-0 rounded"
                            responsive
                            hover
                          >
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell className="text-center fw-semibold">
                                  Moneda
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center fw-semibold">
                                  Valor
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center fw-semibold">
                                  Fecha
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {item.producto?.precios?.map((precio, i) => (
                                <CTableRow key={i}>
                                  <CTableDataCell className="text-center">
                                    {precio.moneda}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {precio.valor}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {formatDate(precio.fecha)}
                                  </CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>
                        </CTableDataCell>
                        <CTableDataCell className="text-center"><CButton
                                                color="danger"
                                                size="sm"
                                                onClick={() => navigate(`/proveedores/eliminar/${item.id}`)}
                                              >
                                                <CIcon icon={cilTrash}/>
                                              </CButton>
                                              </CTableDataCell>
                                                <CTableDataCell className="text-center"><CButton
                                                color="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => navigate(`/proveedores/update/${item.id}`)}
                                              >
                                                <CIcon icon={cilPencil}/>
                                              </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                )}
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Stock
