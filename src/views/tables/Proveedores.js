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
import { cilUser, cilPhone, cilEnvelopeClosed } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

  // Datos de ejemplo
  const tableExample = [
    {
      id: '1',
      razonSocial: 'Proveedor Ejemplo S.A.',
      telefono: '+598 1234 5678',
      email: 'contacto@proveedor.com',
    },
    {
      id: '2',
      razonSocial: 'Distribuidora XYZ',
      telefono: '+598 8765 4321',
      email: 'ventas@xyz.com',
    },
  ]

  const Proveedores = () => {
    const [proveedores, setProveedores] = useState([])
    const navigate = useNavigate()

  useEffect(() => {
    fetch('https://100.27.84.204:8085/proveedores', {
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
            <CCardHeader>Listado {' de '} Proveedores <CButton color="success" onClick={() => navigate('/proveedores/add')}>
              ➕ Agregar
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
                        <CTableDataCell className="text-center">{item.razonSocial}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.telefono}</CTableDataCell>
                        <CTableDataCell className="text-center">{item.email}</CTableDataCell>
                        <CTableDataCell className="text-center"><CButton
                        color="danger"
                        size="sm"
                        onClick={() => navigate(`/proveedores/eliminar/${item.id}`)}
                      >
                        🗑️ Eliminar
                      </CButton>
                      </CTableDataCell>
                        <CTableDataCell className="text-center"><CButton
                        color="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/proveedores/update/${item.id}`)}
                      >
                        ✏️ Modificar
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
