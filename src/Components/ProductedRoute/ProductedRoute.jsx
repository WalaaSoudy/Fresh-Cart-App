import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

 function ProductedRoute (props) {
    const navigate=useNavigate()
    if(localStorage.getItem("token")!==null){
        return props.children
    }
    else
    {
       return <Navigate to="/login"/>
    }
  return (
    <div>
      
    </div>
  )
}

export default ProductedRoute
