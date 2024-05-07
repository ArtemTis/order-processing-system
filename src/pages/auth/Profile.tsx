import React from 'react'
import { userApi } from '../../entities/auth/userApi'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH, LOGIN_PATH } from '../../shared/config/routerConfig/routeConstants';
import { useSelector } from 'react-redux';
import { selectIsAuthorised, selectLoginResponse } from '../../entities/auth/selectors';
import { selectCurrentUser } from '../../entities/auth/authSlice';

const Profile = () => {
  const [sendInfo, { isError, isLoading, data }] = userApi.useLogoutMutation();

  const navigate = useNavigate();


  const logout = () => {
    sendInfo(1).then(() => {
      navigate(`/${ACCOUNT_PATH}/${LOGIN_PATH}`)
    });
  }

  // const selector = useSelector(selectLoginResponse);
  // const isAuthorised = useSelector(selectIsAuthorised);

  const user = useSelector(selectCurrentUser);

  console.log(user);

  return (
    <StyledWrapper>
      Profile
      <h1>{user?.name}</h1>
      <h3>{user?.email}</h3>
      
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