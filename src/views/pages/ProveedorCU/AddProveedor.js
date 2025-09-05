import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const AgregarProveedor = () => {
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const navigate = useNavigate()
  const [errors, setErrors] = useState({ nombre: '', direccion: '', telefono: '' })

   // Función de validación
  const validate = () => {
    const newErrors = { nombre: '', direccion: '', telefono: '' }
    let isValid = true

    // Validación de nombre
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre no puede estar vacío'
      isValid = false
    } else if (!/[a-zA-Z]/.test(nombre)) {
      newErrors.nombre = 'El nombre debe contener al menos una letra'
      isValid = false
    }

    // Validación de dirección
    if (!direccion.trim()) {
      newErrors.direccion = 'La dirección no puede estar vacía'
      isValid = false
    }

    // Validación de teléfono
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

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8085/proveedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify({ nombre, direccion, telefono }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al crear proveedor')
        return res.json()
      })
      .then(() => navigate('/proveedores'))
      .catch((err) => console.error(err))
  }

  return (
    <CCard>
      <CCardHeader>Agregar Proveedor</CCardHeader>
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
          {errors.nombre && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.nombre}</div>}
          <CFormInput
            type="text"
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            className="mb-3"
          />
          {errors.direccion && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.direccion}</div>}
          <CFormInput
            type="text"
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="mb-3"
          />
          {errors.direccion && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.dreccion}</div>}
          <CButton type="submit" color="success">
            Guardar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AgregarProveedor
