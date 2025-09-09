import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const UpdateStock = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const navigate = useNavigate()
  const [proveedores, setProveedores] = useState([])
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('')
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState('')
  const [cantidad, setCantidad] = useState('')

  // cargar proveedores para el select
  useEffect(() => {
    fetch('https://100.27.84.204:8085/proveedores', {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProveedores(data)
      })
      .catch((err) => console.error('Error cargando proveedores:', err))
  }, [])

  // cargar productos para el select
  useEffect(() => {
    fetch('https://100.27.84.204:8085/productos', {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(data)
      })
      .catch((err) => console.error('Error cargando productos:', err))
  }, [])

  useEffect(() => {
    fetch(`https://100.27.84.204:8085/stocks`, {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener el stock')
        return res.json()
      })
      .then((data) => {
        const item = data.find((i) => i.id === id)
        if (item) {
          setProductoSeleccionado(item.producto)
          setCantidad(item.cantidad)
          setProveedorSeleccionado(item.proveedor)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const proveedor = proveedores.find((p) => p.id.toString() === proveedorSeleccionado)
    const producto = productos.find((p) => p.id.toString() === productoSeleccionado)
    const stock = {
      id,
      proveedor,
      producto,
      cantidad,
    }

    fetch('https://100.27.84.204:8085/stocks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify(stock),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al modificar stock')
        else toast.success('Exito!')
      })
      .then(() => navigate('/stock'))
      .catch((err) => console.error(err))
  }

  return (
    <CCard>
      <CCardHeader>Modificar Venta</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormSelect
            label="Proveedor"
            value={proveedorSeleccionado}
            onChange={(e) => setProveedorSeleccionado(e.target.value)}
            required
            className="mb-3"
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.RazonSocial}
              </option>
            ))}
          </CFormSelect>
          <CFormSelect
            label="Producto"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
            required
            className="mb-3"
          >
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombre}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type="text"
            label="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            className="mb-3"
          />
          <CButton type="submit" color="warning">
            Modificar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default UpdateStock
