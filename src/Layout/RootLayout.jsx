import { Outlet } from 'react-router-dom'
import { Footer } from '../components'

function routeLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default routeLayout
