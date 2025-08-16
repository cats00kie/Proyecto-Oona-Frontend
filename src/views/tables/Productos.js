import React, { useEffect } from 'react'
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

  //   useEffect(() => {
  //     if(match){
  //     fetch("http://localhost:8085/mercadoLibre?test="+crypto.randomUUID(), {
  //         method: 'POST',
  //                 headers: {
  //                     "Content-Type": "application/json",
  //           "Codigo" : match[1]
  //                 },
  //             }).then(response => {
  //         if(!response.ok) toast.error("ERROR en el POST");
  //         return fetch("http://localhost:8085/mercadoLibre?test="+crypto.randomUUID(), {
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //       });
  //       }).then((r) => r.json())
  //                 .then((data) => {
  //           console.log("RESPUESTA DE API: ",data);
  //           toast.success("Conectad@!");
  //         }).then(response => {
  //         return fetch("http://localhost:8085/productos?test="+crypto.randomUUID(), {
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //       });
  //       }).then((r) => r.json())
  //                 .then((data) => {
  //           console.log("RESPUESTA DE API: ",data);
  //         })
  //     }
  //     else{
  //       toast.error("No estás conectad@ a Mercado Libre");
  //     }
  //   });

  return (
    <>
      {/* <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Listado {' de '} Productos</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">ID</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilImage} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Nombre</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Precio UYU
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Descripción</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Proveedor
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Características
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilFolder} />{' '}
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.idMeli}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.foto.src} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.nombre}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.precio}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.descripcion}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.proveedor}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CTable align="middle" className="mb-0 border" hover responsive>
                          <CTableHead className="text-nowrap">
                            <CTableRow>
                              <CTableHeaderCell className="bg-body-tertiary">
                                Nombre
                              </CTableHeaderCell>
                              <CTableHeaderCell className="bg-body-tertiary">
                                Descripción
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {item.categorias.map((categoria, index) => (
                              <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell>
                                  <div>{categoria.nombre}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{categoria.descripcion}</div>
                                </CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.idMeli != null && <div>No es Local</div>}
                        {item.idMeli == null && <div>Local</div>}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Productos
