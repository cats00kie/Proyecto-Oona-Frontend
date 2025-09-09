import React, { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSignalCellular4,
  cilSun,
  cilUser,
  cilWifiSignal0,
  cilWifiSignal4,
} from '@coreui/icons'
import { toast } from 'react-toastify'
const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const navigator = useNavigate();
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const logout = () => {
    localStorage.clear()
    toast.info('Bye bye')
    navigator('/Login')
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        {/* <CHeaderNav>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-0">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CNavItem>
            <CNavLink
              className="d-flex align-items-center border border-1 border-success rounded-pill"
              href="https://auth.mercadolibre.com.uy/authorization?response_type=code&client_id=6568777871031299&redirect_uri=https://ant-needed-apparently.ngrok-free.app/"
            >
              <p className="me-2 fw-light my-0">Conectarse/Actualizar</p>
              <CIcon size="lg" icon={cilSignalCellular4} />
            </CNavLink>
          </CNavItem>
          {localStorage.getItem("token") != null && (
            <li className="nav-item d-flex align-items-center">
              <CNavLink className="nav-link text-dark" to="/">
                <button type="button" className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </CNavLink>
            </li>
          )}
        </CHeaderNav> */}
        <CHeaderNav className="d-flex align-items-center gap-2">
          {/* Theme Selector Dropdown */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false} className="d-flex align-items-center">
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {/* Vertical Divider
          <div className="vr h-100 mx-2 text-body text-opacity-75" /> */}

          {/* Connect/Update Button */}
          <CNavItem>
            <CNavLink
              className="d-flex align-items-center border border-1 border-success rounded-pill px-3 py-1"
              href="https://auth.mercadolibre.com.uy/authorization?response_type=code&client_id=6568777871031299&redirect_uri=https://54.91.166.104:3000/"
            >
              <p className="me-2 fw-light mb-0">Conectarse/Actualizar</p>
              <CIcon size="lg" icon={cilSignalCellular4} />
            </CNavLink>
          </CNavItem>

          {/* Logout Button */}
          {localStorage.getItem('token') != null && (
            <li className="nav-item d-flex align-items-center">
              <CNavLink className="nav-link text-dark" to="/">
                <button type="button" className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </CNavLink>
            </li>
          )}
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
