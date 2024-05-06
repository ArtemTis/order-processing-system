import React from 'react'
import { userApi } from '../../entities/user/userApi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATH } from '../../shared/config/routerConfig/routeConstants';

const Login = () => {
  const [sendInfo, { isError, isLoading, data }] = userApi.useLoginMutation();

  const navigate = useNavigate();

  const login = async () => {
    await sendInfo({ email: "user@mail.ru", password: '12345678' })
    .then(() => {
      // OpenAPI.TOKEN = `${auth.credential.authToken}`;

      navigate(`/${PROFILE_PATH}`);
  });
  }


  return (
    <StyledWrapper>
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
        <div>
        <p>{data.user.name}</p>
        <p>{data.user.email}</p>

        </div>
      }
    </StyledWrapper>
  )
}

export default Login

const StyledWrapper = styled.div`
  background-color: #303030;
  height: 100vh;
`