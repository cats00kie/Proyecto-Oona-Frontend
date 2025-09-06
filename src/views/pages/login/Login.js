import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { Toast } from '@coreui/coreui'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'

const Login = () => {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const [habilitado, setHabilitado] = useState(true);

  useEffect(() => {if(localStorage.getItem("apiKey") != null) navigator("/Dashboard")},[])

  useEffect(() => {
      if (usuario.trim() && password.trim()) {
          setHabilitado(false); // Enable the button
      } 
  }, [usuario, password])

  const loginUsuario = () => {
    fetch("https://100.27.84.204:8085/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Nombre": usuario,
                "Contrasena": hashStringSHA256(password)
            }),
        })
            .then(function (response) {
                // console.log(response);
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
    
                if (data.token != null) {
                    localStorage.setItem("token", data.token);
                    toast.success("Ingresad@!");
                    navigator("/Dashboard");
    
                } else {
                    toast.error(data.mensaje);
                }
            });   
  }

  const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
  };

  const cambiarPassword = (e) => {
      setPassword(e.target.value);
  };

  const hashStringSHA256 = (str) => {
        return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
  };

  return (
    <>
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Project Oona</h1>
                    <p className="text-body-secondary">Ingresa con tu cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Usuario" id="usuario" autoComplete="username" onChange={cambiarUsuario} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id= "password"
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        onChange={cambiarPassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" disabled={habilitado} color="primary" className="px-4" onClick={loginUsuario}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>




    {/* <div className='row row-cols-2'>
        <div className="col-md-3 sm-12 position-absolute top-50 start-50 translate-middle">
            <div className="login">
                <div className="card">
                    <div className="card-header">
                    Login
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="usuario" className="control-label">Username</label>
                            <input id="usuario" className="form-control" onChange={cambiarUsuario} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input type="password" id="password" className="form-control" onChange={cambiarPassword} />
                        </div>
                        <CButton type="submit" color="primary" className="px-4" disabled={habilitado} onClick={loginUsuario}>
                          Login
                        </CButton>
                    </div>
                    </div>
            </div>
        </div>
        </div> */}
    </>
  )
}

export default Login
