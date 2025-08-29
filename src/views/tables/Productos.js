import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilImage,
  cilDollar,
  cilFolder,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import react from 'src/assets/images/react.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from '../dashboard/MainChart'
import Login from '../pages/login/Login'
import { toast } from 'react-toastify'
import { data } from 'react-router-dom'
import { LogarithmicScale } from 'chart.js'
const url = window.location.href
const match = url.match(/[?&]code=([^#&]+)/)

const Productos = () => {
  //   const progressExample = [
  //     { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
  //     { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
  //     { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
  //     { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
  //     { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  //   ]
  
  const [productos, setProductos] = useState([])
  const [precios, setPrecios] = useState([])
  const [caracteristicas, setCarac] = useState([])

  const tableExample = [
    {
      idMeli: 'MLU8327489327',
      foto: { src: react },
      nombre: 'Producto de Demo',
      precio: '$700',
      descripcion: 'Descripción del Producto',
      proveedor: 'Ninguno',
      categorias: [
        {
          nombre: 'Ejemplo',
          descripcion: 'Categoria de ejemplo',
        },
      ],
    },
  ]

  useEffect(() => {
    fetch('http://localhost:8085/productos?test=' + crypto.randomUUID(), {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data)
        setProductos(data)
      })
    })
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    if (isNaN(date)) return 'Fecha inválida'

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  return (
    <>
      <CRow>
        <CCol xs={12} md={12} lg={12} xl={12} xxl={12} className="mx-auto">
          <CCard className="mb-4 ">
            <CCardHeader>Listado {' de '} Productos</CCardHeader>
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
                      <CIcon icon={cilImage} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">Nombre</CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">Precio UYU</CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">Descripción</CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">Proveedor</CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      Características
                    </CTableHeaderCell>
                    <CTableHeaderCell className="fw-bold text-center">
                      <CIcon icon={cilFolder} />
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {productos != null && (
                  <CTableBody>
                    {productos.map((item, index) => (
                      <CTableRow key={index} className="align-middle">

                        <CTableDataCell className="text-center">{item.idMeli}</CTableDataCell>

                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={item.urlFoto} />
                        </CTableDataCell>

                        <CTableDataCell className="text-center">{item.nombre}</CTableDataCell>

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
                                  Precio
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center fw-semibold">
                                  Fecha
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {item.precios?.map((precio, i) => (
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

                        <CTableDataCell className="text-center text-wrap">
                          {item.descripcion}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          {item.proveedor?.nombre ?? '-'}
                        </CTableDataCell>

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
                                  Nombre
                                </CTableHeaderCell>
                                <CTableHeaderCell className="text-center fw-semibold">
                                  Descripción
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {item.caracteristicas?.map((car, i) => (
                                <CTableRow key={i}>
                                  <CTableDataCell className="text-center">
                                    {car.nombre}
                                  </CTableDataCell>
                                  <CTableDataCell className="text-center">
                                    {car.descripcion}
                                  </CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          {item.idMeli ? (
                            <div className="badge bg-danger">No es Local</div>
                          ) : (
                            <div className="badge bg-success">Local</div>
                          )}
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

export default Productos
