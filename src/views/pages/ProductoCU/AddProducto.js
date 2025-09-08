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
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [proveedores, setProveedores] = useState([])
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('')
  const [caracteristicas, setCaracteristicas] = useState([{ nombre: '', descripcion: '' }])
  const navigate = useNavigate()

  // cargar proveedores para el select
  useEffect(() => {
    fetch('http://localhost:8085/proveedores', {
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
    console.log(proveedor)
    const producto = {
      urlFoto,
      proveedor,
      caracteristicas,
      precios: [],
      nombre,
      descripcion,
    }
    console.log('Producto a enviar:', JSON.stringify(producto, null, 2))
    fetch('http://localhost:8085/productos', {
      method: 'POST',
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
        <h2>Agregar Producto</h2>
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

                onChange={(e) => handleCaracteristicaChange(index, 'Nombre', e.target.value)}
                className="mb-2"
              />
              <CFormInput
                type="text"
                label="Descripción"
                value={car.descripcion}

                onChange={(e) => handleCaracteristicaChange(index, 'Descripcion', e.target.value)}
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

          <CButton type="submit" color="success">
            Guardar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AgregarProducto
