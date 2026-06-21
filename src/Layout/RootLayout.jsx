import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../components'
import Home from '../pages/home'

function routeLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default routeLayout
