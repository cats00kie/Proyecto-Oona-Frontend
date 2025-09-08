import React, { useEffect, useState } from 'react'
import {
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
import {
  cilUser,
  cilPhone,
  cilEnvelopeClosed,
  cilPen,
  cilPencil,
  cilTrash,
  cilPlus,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const navigator = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8085/proveedores', {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'), /// si tu backend requiere auth
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener proveedores')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setProveedores(data)
      })
      .catch((error) => {
        console.error('Error en fetch:', error)
      })
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12} md={12} lg={12} xl={12} xxl={12} className="mx-auto">
          <CCard className="mb-4 ">
            <CCardHeader>
              Listado {' de '} Proveedores{' '}
              <CButton
                color="success"
                onClick={() => navigator('/proveedores/add')}
                className="mx-3"
              >
                <CIcon icon={cilPlus} /> Agregar
              </CButton>{' '}
            </CCardHeader>
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
                      <CIcon icon={cilUser} /> Razón Social
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilPhone} /> Teléfono
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilEnvelopeClosed} /> Email
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {proveedores != null && (
                  <CTableBody>
                    {proveedores.map((item, index) => (
                      <CTableRow key={index} className="align-middle">
                        <CTableDataCell className="text-center">{item.id}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.RazonSocial}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.Telefono}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.Email}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => {
                              if (
                                window.confirm('¿Estás seguro que querés eliminar este proveedor?')
                              ) {
                                fetch('http://localhost:8085/proveedores', {
                                  // fetch("https://100.27.84.204:8085/productos/"+ item.id, {
                                  method: 'DELETE',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'X-userToken': localStorage.getItem('token'),
                                  },
                                  body: JSON.stringify(item),
                                })
                                  .then((res) => {
                                    if (!res.ok) throw new Error('Error al eliminar')
                                    toast.success('Proveedor eliminado')
                                    setProveedores(proveedores.filter((p) => p.id !== item.id))
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
                            onClick={() => navigator(`/proveedores/update?id=${item.id}`)}
                          >
                            <CIcon icon={cilPencil} />
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

export default Proveedores
