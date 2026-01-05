import React from 'react'
import useUserContext from '../../hooks/useUserContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
      let {globalState}=useUserContext()
      if(!globalState.token){
        return <Navigate to="/login"></Navigate>
      }
  return <>
  {children}
  </>
}

export default PrivateRoutes