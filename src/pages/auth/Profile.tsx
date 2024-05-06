import React from 'react'
import { userApi } from '../../entities/user/userApi'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../shared/config/routerConfig/routeConstants';

const Profile = () => {
  const [sendInfo, { isError, isLoading, data }] = userApi.useLogoutMutation();

  const navigate = useNavigate();


  const logout = () => {
    sendInfo(1).then(() => {
      navigate(LOGIN_PATH)
    });
  }

  return (
    <StyledWrapper>
      Profile

      {
        isLoading && <p>Loading...</p>
      }
      {
        isError && <p>ERROR</p>
      }

      <button onClick={logout}>
        Выйти
      </button>

    </StyledWrapper>
  )
}

export default Profile


const StyledWrapper = styled.div`
  background-color: #303030;
  height: 100vh;
`