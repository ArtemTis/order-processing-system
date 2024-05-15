import React from 'react'
import { userApi } from '../../entities/auth/userApi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH, PROFILE_PATH, REGISTER_PATH } from '../../shared/config/routerConfig/routeConstants';
import { useAppDispatch } from '../../app/store/store';
import { setCredentials } from '../../entities/auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [sendInfo, { isError, isLoading, data }] = userApi.useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    // const user = await sendInfo({ email: "user@mail.ru", password: '12345678' }).unwrap();
    // console.log(user);
    // if (data) {
    //   dispatch(setCredentials(data))
    //   navigate(`/${PROFILE_PATH}`);
    //   console.log('reroute');
    // }

    try {
      const user = await sendInfo({ email: "user@mail.ru", password: '12345678' }).unwrap();
      dispatch(setCredentials(user))
      navigate(`/${ACCOUNT_PATH}/${PROFILE_PATH}`);
    } catch (err) {

    }
  }

  const register = () => {
    navigate(`/${ACCOUNT_PATH}/${REGISTER_PATH}`);
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
          <p>{data.user?.name}</p>
          <p>{data.user?.email}</p>

        </div>
      }

      <hr />

      <button onClick={register}>
        Register
      </button>
    </StyledWrapper>
  )
}

export default Login

const StyledWrapper = styled.div`
  /* background-color: #303030; */
  height: 100vh;
`