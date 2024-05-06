import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { LOGIN_PATH } from '../config/routerConfig/routeConstants'
import { userApi } from '../../entities/user/userApi'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { selectIsAuthorised } from '../../entities/user/selectors'

interface GuardProps {
   element: React.ReactElement
}


const AuthGuard: React.FC<GuardProps> = ({ element }) => {
   // const isAuthorised = useAppSelector(selectIsAuthorised);

   const isAuthorised = useSelector(selectIsAuthorised)

   console.log(isAuthorised);


   return isAuthorised ? element : <Navigate to={LOGIN_PATH} replace />
   // return <Navigate to={LOGIN_PATH} replace />
}

export default AuthGuard

