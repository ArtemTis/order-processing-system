import React from 'react'
import { userApi } from '../../entities/user/userApi';

const Login = () => {
  const [sendInfo, { isError, isLoading, data }] = userApi.useLoginMutation();

  const login = async () => {
    await sendInfo({ username: "username", password: 'password' });
  }

  return (
    <div>
      {
        isLoading && <p>Loading...</p>
      }
      {
        isError && <p>ERROR</p>
      }
      <button onClick={login}>
        Login
      </button>
      {
        data && 
        <p>{data.name}</p>
      }
    </div>
  )
}

export default Login