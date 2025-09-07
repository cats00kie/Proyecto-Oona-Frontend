import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton } from '@coreui/react'
import { toast } from 'react-toastify'

const UpdateProveedor = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const navigate = useNavigate()

  const [RazonSocial, setRazonSocial] = useState('')
  const [Email, setEmail] = useState('')
  const [Telefono, setTelefono] = useState('')
  const [errors, setErrors] = useState({ nombre: '', direccion: '', telefono: '' })

  // Traer los datos del proveedor al cargar la página
  useEffect(() => {
    fetch(`http://localhost:8085/proveedores`, {
    // fetch(`https://100.27.84.204:8085/proveedores`, {
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
        const item = data.find((i) => i.id === id)
        if (item) {
          setRazonSocial(item.RazonSocial)
          setEmail(item.Email)
          setTelefono(item.Telefono)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  // Función de validación
  const validate = () => {
    const newErrors = { nombre: '', direccion: '', telefono: '' }
    let isValid = true

    if (!RazonSocial.trim()) {
      newErrors.RazonSocial = 'El nombre no puede estar vacío'
      isValid = false
    } else if (!/[a-zA-Z]/.test(RazonSocial)) {
      newErrors.RazonSocial = 'El nombre debe contener al menos una letra'
      isValid = false
    }

    if (!Email.trim()) {
      newErrors.Email = 'La dirección no puede estar vacía'
      isValid = false
    }

    if (!Telefono.trim()) {
      newErrors.Telefono = 'El teléfono no puede estar vacío'
      isValid = false
    } else if (!/\d/.test(Telefono)) {
      newErrors.Telefono = 'El teléfono debe contener al menos un número'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Manejar envío del formulario (PUT)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    
    fetch(`http://localhost:8085/proveedores`, {
    //fetch(`https://100.27.84.204:8085/proveedores`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-userToken': localStorage.getItem('token'),
      },
      body: JSON.stringify({ RazonSocial, Telefono, Email, id }),
    })
      .then((res) => {
        console.log(id);
        if (!res.ok) throw new Error('Error al actualizar proveedor')
        else toast.success("Exito!");
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
            label="Razon Social"
            value={RazonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            className="mb-1"
          />
          {errors.RazonSocial && (
            <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.RazonSocial}</div>
          )}

          <CFormInput
            type="text"
            label="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-1"
          />
          {errors.Email && <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.Email}</div>}

          <CFormInput
            type="text"
            label="Teléfono"
            value={Telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="mb-1"
          />
          {errors.Telefono && (
            <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.Telefono}</div>
          )}

          <CButton type="submit" color="warning" className="mt-3">
            Guardar cambios
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default UpdateProveedor
