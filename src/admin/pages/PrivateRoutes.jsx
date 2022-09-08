import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = localStorage.getItem('token')
  // return ( 
    if (window.location.pathname == "/admin/login" && auth)  {
      return <Navigate to="/admin/" />
    } else if(auth && window.location.pathname != "/admin/login"){
      return <Outlet />
    } else {
      return <Navigate to="/admin/login" />
    }
    // auth || (auth && window.location.pathname == "/admin/login" ) ? <Outlet /> : <Navigate to="/admin/login" />

  // )
}

export default PrivateRoutes