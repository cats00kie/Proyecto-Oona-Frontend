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

const AgregarVenta = () => {
  const [items, setItems] = useState([])
  const [fecha, setFecha] = useState('')
  const [precioTotal, setPrecioTotal] = useState('')
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState('')
  const [cantidad, setCantidad] = useState('')
  const navigate = useNavigate()

  const handleItemChange = (index, field, value) => {
    const nuevas = [...items]
    nuevas[index][field] = value
    setItems(nuevas)
  }

  const agregarItems = () => {
    setItems([...items, { productoSeleccionado: '', cantidad: '' }])
  }

  useEffect(() => {
    let total = 0

    items.forEach((item) => {
      const producto = productos.find((p) => p.id === item.productoSeleccionado)
      const precio = producto?.precios?.[0].valor ?? 0
      const cantidad = parseFloat(item.cantidad) || 0

      total += precio * cantidad
    })

    setPrecioTotal(total.toFixed(2))
  }, [items, productos])

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
    const ventaData = {
      fecha,
      items: items.map((item) => ({
        producto: productos.find((p) => p.id.toString() === item.productoSeleccionado),
        cantidad: Number(item.cantidad),
      })),
      precioTotal,
    }
    fetch('https://100.27.84.204:8085/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify(ventaData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al crear venta')
        toast.success('¡Venta guardada con éxito!')
        navigate('/ventas')
      })
      .catch((err) => {
        console.error(err)
        toast.error('Error al guardar la venta')
      })
  }

  return (
    <CCard>
      <CCardHeader>Agregar Venta</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            type="date"
            label="Fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="mb-3"
          />

          <h6>
            Items{' '}
            <CButton type="button" color="success" onClick={agregarItems}>
              Agregar
            </CButton>
          </h6>
          {items.map((i, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <CFormSelect
                label="Producto"
                value={i.productoSeleccionado}
                onChange={(e) => handleItemChange(index, 'productoSeleccionado', e.target.value)}
                required
                className="mb-3"
              >
                <option value="">Seleccione un producto</option>
                {productos.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nombre}
                  </option>
                ))}
              </CFormSelect>
              <CFormInput
                type="number"
                label="Cantidad"
                value={i.cantidad}
                onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
                className="mb-2"
              />

              <CButton
                type="button"
                color="danger"
                size="sm"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
              >
                Eliminar
              </CButton>
            </div>
          ))}
          <CFormInput
            type="text"
            label="PRECIO TOTAL"
            disabled={true}
            value={precioTotal}
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

export default AgregarVenta
