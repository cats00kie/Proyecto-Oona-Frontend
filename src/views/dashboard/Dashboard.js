
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
  cilFactory,
  cilUser,
  cilStorage,
  cilImage,
  cilFolder,
  cilTrash,
  cilPencil,
  cilPlus,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import Login from '../pages/login/Login'
import { toast } from 'react-toastify'
import { data, useNavigate } from 'react-router-dom'

import { CChartBar } from '@coreui/react-chartjs'

const url = window.location.href
const match = url.match(/[?&]code=([^#&]+)/)

const Dashboard = () => {
  const navigator = useNavigate()
  const [stocks, setStocks] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token")
    const apiKey = localStorage.getItem("apiKey")

    if (!token) {
      navigator('/login')
      return
    }

    if (!match) {
      toast.error('No estás conectad@ a MELI')
      return
    }

    if (!apiKey || apiKey === 'null') {
      fetch('https://100.27.84.204:8085/mercadoLibre?test=' + crypto.randomUUID(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Codigo: match[1],
        },
      })
        .then((r) => r.json())
        .then((data) => {
          localStorage.setItem("apiKey", data.apiKey)
          toast.success('Conectad@!')
        })
        .then(async () => {
          await fetch('https://100.27.84.204:8085/stocks', {
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
              setStocks(data)
            })
            .catch((err) => console.error(err))
        })
    } else {
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
          setStocks(data)
        })
        .catch((err) => console.error(err))
    }
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
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Ventas en el último año</CCardHeader>
                <CCardBody>
                  {match ? (
                    <CChartBar
                      data={{
                        labels: [
                          'Enero',
                          'Febrero',
                          'Marzo',
                          'Abril',
                          'Mayo',
                          'Junio',
                          'Julio',
                          'Agosto',
                          'Setiembre',
                          'Octubre',
                          'Noviembre',
                          'Diciembre',
                        ],
                        datasets: [
                          {
                            label: 'Ventas',
                            backgroundColor: ['#ff6598ff', '#62beffff'],
                            data: [70, 20, 12, 39, 10, 40, 39, 80, 40, 30, 50, 70, 40, 80],
                          },
                        ],
                      }}
                      labels="months"
                    />
                  ) : (
                    <div className="text-center fw-bold text-danger">
                      No estás conectado a Mercado Libre!
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Productos más vendidos en el último mes</CCardHeader>
                <CCardBody>
                  {match ? (
                    <CChartBar
                      data={{
                        labels: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4'],
                        datasets: [
                          {
                            label: 'Cantidad',
                            data: [23, 21, 16, 10],
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#08ffd2ff'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#08ffd2ff'],
                          },
                        ],
                      }}
                      labels="months"
                    />
                  ) : (
                    <div className="text-center fw-bold text-danger">
                      No estás conectado a Mercado Libre!
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>Listado {' de '} Stock </CCardHeader>
                <CCardBody>
                  {match ? (
                    <CTable
                      align="center"
                      className="mb-4 border table-striped table-hover"
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
                          <CTableHeaderCell className="fw-bold text-center">
                            Descripción
                          </CTableHeaderCell>
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

                              <CTableDataCell className="text-center">
                                {item.cantidad}
                              </CTableDataCell>

                              <CTableDataCell className="text-center">
                                <CTable
                                  align="center"
                                  className="table-sm table-bordered mb-0 rounded"
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
                            </CTableRow>
                          ))}
                        </CTableBody>
                      )}
                    </CTable>
                  ) : (
                    <div className="text-center fw-bold text-danger">
                      No estás conectado a Mercado Libre!
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
