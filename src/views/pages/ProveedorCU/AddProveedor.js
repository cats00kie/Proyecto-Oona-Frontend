import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'


const AgregarProveedor = () => {
  const [RazonSocial, setRazonSocial] = useState('')
  const [Email, setEmail] = useState('')
  const [Telefono, setTelefono] = useState('')
  const navigate = useNavigate()
  const [errors, setErrors] = useState({ nombre: '', direccion: '', telefono: '' })

   // Función de validación
  const validate = () => {
    const newErrors = { nombre: '', direccion: '', telefono: '' }
    let isValid = true

    // // Validación de nombre
    // if (!razonSocial.trim()) {
    //   newErrors.razonSocial = 'El nombre no puede estar vacío'
    //   isValid = false
    // } else if (!/[a-zA-Z]/.test(razonSocial)) {
    //   newErrors.razonSocial = 'El nombre debe contener al menos una letra'
    //   isValid = false
    // }

    // // Validación de dirección
    // if (!email.trim()) {
    //   newErrors.email = 'La dirección no puede estar vacía'
    //   isValid = false
    // }

    // // Validación de teléfono
    // if (!telefono.trim()) {
    //   newErrors.telefono = 'El teléfono no puede estar vacío'
    //   isValid = false
    // } else if (!/\d/.test(telefono)) {
    //   newErrors.telefono = 'El teléfono debe contener al menos un número'
    //   isValid = false
    // }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://100.27.84.204:8085/proveedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify({RazonSocial, Telefono, Email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al crear proveedor')
        else toast.success("Exito!")
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
            label="Razon Social"
            value={RazonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            required
            className="mb-3"
          />
          {errors.RazonSocial && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.RazonSocial}</div>}
          <CFormInput
            type="text"
            label="E-mail"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3"
          />
          {errors.Email && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.Email}</div>}
          <CFormInput
            type="text"
            label="Teléfono"
            value={Telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="mb-3"
          />
          {errors.Telefono && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.Telefono}</div>}
          <CButton type="submit" color="success">
            Guardar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AgregarProveedor
