import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_PATH, LOGIN_PATH } from '../../shared/config/routerConfig/routeConstants';

const Register = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate(`/${ACCOUNT_PATH}/${LOGIN_PATH}`)
  }

  return (
    <div>Register

      <hr />
      <button onClick={login}>
        Login
      </button>
    </div>
  )
}

export default Register