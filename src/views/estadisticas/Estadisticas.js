import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/components'

const url = window.location.href
const match = url.match(/[?&]code=([^#&]+)/)

const Estadisticas = () => {
  return (
    <>
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
                        label: 'Ventas en el último año',
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
            <CCardHeader>Productos más vendidos</CCardHeader>
            <CCardBody>
              {match ? (
                <CChartPie
                  data={{
                    labels: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4'],
                    datasets: [
                      {
                        data: [300, 150, 100, 85],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#08ffd2ff'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#08ffd2ff'],
                      },
                    ],
                  }}
                />
              ) : (
                <div className="text-center fw-bold text-danger">
                  No estás conectado a Mercado Libre!
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Estadisticas
