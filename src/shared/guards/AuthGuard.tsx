import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { LOGIN_PATH } from '../config/routerConfig/routeConstants'

interface GuardProps {
   element: React.ReactElement
}

const AuthGuard: React.FC<GuardProps> = ({element}) => {
   // const isAuthorised = useAppSelector(selectIsAuthorised);

   // return true ? element : <Navigate to={LOGIN_PATH} replace />
   return <Navigate to={LOGIN_PATH} replace />
}

export default AuthGuard

