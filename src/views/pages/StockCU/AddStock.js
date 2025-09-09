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
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const AgregarStock = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const proveedor = proveedores.find((p) => p.id.toString() === proveedorSeleccionado)
    const producto  = productos.find((p) => p.id.toString() === productoSeleccionado)
    const stock = {
      proveedor,
      producto,
      cantidad
    }

    fetch('https://100.27.84.204:8085/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify(stock),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al crear proveedor')
        else toast.success('Exito!')
      })
      .then(() => navigate('/stock'))
      .catch((err) => console.error(err))
  }

  return (
    <CCard>
      <CCardHeader>Agregar Stock</CCardHeader>
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
          <CButton type="submit" color="success">
            Guardar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AgregarStock
