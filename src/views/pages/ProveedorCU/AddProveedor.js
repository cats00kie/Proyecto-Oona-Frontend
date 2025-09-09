import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'


const AgregarProveedor = () => {
  const [RazonSocial, setRazonSocial] = useState('')
  const [Email, setEmail] = useState('')
  const [Telefono, setTelefono] = useState('')
  const navigate = useNavigate()


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

          <CFormInput
            type="text"
            label="E-mail"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3"
          />

          <CFormInput
            type="text"
            label="Teléfono"
            value={Telefono}
            onChange={(e) => setTelefono(e.target.value)}
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

export default AgregarProveedor
