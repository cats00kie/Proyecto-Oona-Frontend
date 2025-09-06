import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton } from '@coreui/react'

const UpdateProveedor = () => {
  const { id } = useParams() // Obtenemos el ID desde la URL
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errors, setErrors] = useState({ nombre: '', direccion: '', telefono: '' })

  // Traer los datos del proveedor al cargar la página
  useEffect(() => {
    fetch(`http://localhost:8085/proveedores/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener el proveedor')
        return res.json()
      })
      .then((data) => {
        setNombre(data.nombre)
        setDireccion(data.direccion)
        setTelefono(data.telefono)
      })
      .catch((err) => console.error(err))
  }, [id])

  // Función de validación
  const validate = () => {
    const newErrors = { nombre: '', direccion: '', telefono: '' }
    let isValid = true

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre no puede estar vacío'
      isValid = false
    } else if (!/[a-zA-Z]/.test(nombre)) {
      newErrors.nombre = 'El nombre debe contener al menos una letra'
      isValid = false
    }

    if (!direccion.trim()) {
      newErrors.direccion = 'La dirección no puede estar vacía'
      isValid = false
    }

    if (!telefono.trim()) {
      newErrors.telefono = 'El teléfono no puede estar vacío'
      isValid = false
    } else if (!/\d/.test(telefono)) {
      newErrors.telefono = 'El teléfono debe contener al menos un número'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Manejar envío del formulario (PUT)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    fetch(`http://localhost:8085/proveedores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify({ nombre, direccion, telefono }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al actualizar proveedor')
        return res.json()
      })
      .then(() => navigate('/proveedores'))
      .catch((err) => console.error(err))
  }

  return (
    <CCard>
      <CCardHeader>Modificar Proveedor</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            type="text"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mb-1"
          />
          {errors.nombre && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.nombre}</div>}

          <CFormInput
            type="text"
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="mb-1"
          />
          {errors.direccion && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.direccion}</div>}

          <CFormInput
            type="text"
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mb-1"
          />
          {errors.telefono && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.telefono}</div>}

          <CButton type="submit" color="warning" className="mt-3">
            Guardar cambios
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default UpdateProveedor
