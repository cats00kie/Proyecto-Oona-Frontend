import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBarChart,
  cilDescription,
  cilDollar,
  cilDrink,
  cilInbox,
  cilSpeedometer,
  cilTruck,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'warning',
    //   text: '',
    // },
  },
  {
    component: CNavItem,
    name: 'Estadísticas',
    to: '/estadisticas',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    // badge: {
    //   color: 'warning',
    //   text: '',
    // },
  },
  {
    component: CNavTitle,
    name: 'Tablas',
  },
  {
    component: CNavItem,
    name: 'Productos',
    to: '/productos',
    icon: <CIcon icon={cilDrink} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Proveedores',
    to: '/proveedores',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Stock',
    to: '/stock',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ventas',
    to: '/ventas',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Docs',
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
