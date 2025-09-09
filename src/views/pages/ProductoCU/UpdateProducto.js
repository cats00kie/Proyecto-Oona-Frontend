import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ModificarProducto = () => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [proveedores, setProveedores] = useState([])
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('')
  const [caracteristicas, setCaracteristicas] = useState([{ nombre: '', descripcion: '' }])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [valor, setValor] = useState('')
  const [Moneda, setMoneda] = useState('')
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

  //buscamos el producto con id de la URL
  useEffect(() => {
    const token = localStorage.getItem('token')
    const apiKey = localStorage.getItem('apiKey')

    if (!token) {
      navigator('/login')
      return
    }

    if (apiKey != null) {
      fetch('https://100.27.84.204:8085//productos', {
        headers: {
          'Content-Type': 'application/json',
          'X-userToken': localStorage.getItem('token'),
        },
      }).then((response) => {
        response.json().then((data) => {
          const item = data.find((i) => i.id === id)
          const ultimoPrecio = item.precios[item.precios.length - 1]
          if (item) {
            setProveedorSeleccionado(item.proveedor)
            setNombre(item.nombre)
            setDescripcion(item.descripcion)
            setCaracteristicas(item.caracteristicas)
            setUrlFoto(item.urlFoto)
            setValor(ultimoPrecio.valor?.toString() || '')
            setMoneda(ultimoPrecio.moneda || '')
          }
        })
      })
    }
  }, [])

  const handleCaracteristicaChange = (index, field, value) => {
    const nuevas = [...caracteristicas]
    nuevas[index][field] = value
    setCaracteristicas(nuevas)
  }

  const agregarCaracteristica = () => {
    setCaracteristicas([...caracteristicas, { nombre: '', descripcion: '' }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const proveedor = proveedores.find((p) => p.id.toString() === proveedorSeleccionado)
    const precioActualizado = {
      Fecha: new Date().toISOString(),
      Valor: parseFloat(valor),
      Moneda,
    }
    const producto = {
      id,
      urlFoto,
      proveedor,
      caracteristicas,
      precios: [precioActualizado],
      nombre,
      descripcion,
    }
    fetch('https://100.27.84.204:8085/productos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify(producto),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al crear producto')
        else toast.success('Producto creado con éxito!')
      })
      .then(() => navigate('/productos'))
      .catch((err) => {
        toast.error('Error al crear producto')
        console.error(err)
      })
  }

  return (
    <CCard>
      <CCardHeader>
        <h2>Modificar Producto</h2>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            type="text"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mb-3"
          />

          <CFormTextarea
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            required
            className="mb-3"
          />

          <CFormInput
            type="text"
            label="URL de Foto"
            value={urlFoto}
            onChange={(e) => setUrlFoto(e.target.value)}
            className="mb-3"
          />
          <CFormInput
            type="number"
            step="0.01"
            label="Precio"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="mb-3"
          />

          <CFormSelect value={Moneda} onChange={(e) => setMoneda(e.target.value)} className="mb-3">
            <option value="">-- Seleccioná moneda --</option>
            <option value="UYU">UYU</option>
            <option value="USD">USD</option>
            <option value="RBR">RBR</option>
              
          </CFormSelect>
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

          <h6>
            Características{' '}
            <CButton type="button" color="success" onClick={agregarCaracteristica}>
              Agregar
            </CButton>
          </h6>
          {caracteristicas.map((car, index) => (
            <div key={index} className="mb-3 border p-2 rounded">
              <CFormInput
                type="text"
                label="Nombre"
                value={car.nombre}
                onChange={(e) => handleCaracteristicaChange(index, 'nombre', e.target.value)}
                className="mb-2"
              />
              <CFormInput
                type="text"
                label="Descripción"
                value={car.descripcion}
                onChange={(e) => handleCaracteristicaChange(index, 'descripcion', e.target.value)}
                className="mb-2"
              />
              <CButton
                type="button"
                color="danger"
                size="sm"
                onClick={() => setCaracteristicas(caracteristicas.filter((_, i) => i !== index))}
              >
                Eliminar
              </CButton>
            </div>
          ))}

          {/* <CButton type="button" color="info" className="mb-3" onClick={agregarCaracteristica}>
            + Agregar Característica
          </CButton> */}

          <CButton type="submit" color="warning">
            Modificar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ModificarProducto
