import React from 'react'
import { userApi } from '../../entities/auth/userApi'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH, LOGIN_PATH } from '../../shared/config/routerConfig/routeConstants';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../entities/auth/selectors';
import { Avatar, Button, Popconfirm, PopconfirmProps, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logout from '../../shared/assets/logout.svg'

const Profile = () => {
  const [sendInfo, { isError, isLoading, data }] = userApi.useLogoutMutation();

  const navigate = useNavigate();


  // const logout = () => {
  //   sendInfo(1).then(() => {
  //     navigate(`/${ACCOUNT_PATH}/${LOGIN_PATH}`)
  //   });
  // }

  // const selector = useSelector(selectLoginResponse);
  // const isAuthorised = useSelector(selectIsAuthorised);

  const user = useSelector(selectCurrentUser);

  console.log(user);

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    sendInfo(1).then(() => {
      navigate(`/${ACCOUNT_PATH}/${LOGIN_PATH}`)
    });
  };

  return (
    <StyledWrapper>

      <h1>Личный кабинет</h1>

      <StyledUserInfo>
        {/* <Avatar size={36} icon={<UserOutlined />} /> */}
        <Avatar style={{ backgroundColor: "#5943af", verticalAlign: 'middle' }} size={100} >
          {user?.name}
        </Avatar>

        <StyledTextWrapper>

          <h1>Имя: {user?.name}</h1>
          <h3>Почта: {user?.email}</h3>
        </StyledTextWrapper>

      </StyledUserInfo>
      {
        isLoading && <p>Loading...</p>
      }
      {
        isError && <p>ERROR</p>
      }

      {/* <button onClick={logout}>
        Выйти
      </button> */}

      <Popconfirm
        title="Выход"
        description="Вы действительно хотите выйти?"
        onConfirm={confirm}
        okText="Да"
        cancelText="нет"
      >
        <LogoutButton danger type='primary'>
          <img src={logout} alt="выйти" />
          Выйти</LogoutButton>
      </Popconfirm>

    </StyledWrapper>
  )
}

export default Profile


const StyledWrapper = styled.div`
  /* background-color: #303030; */
  height: 100vh;
  padding: 20px;

  background-color: #f5f5f5;

    h1{
      font-size: 22px;
    }
    h3{
      font-size: 18px;
    }
`

const StyledUserInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 15px;
`

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const LogoutButton = styled(Button)`
  border-radius: 7px;
  display: flex;
  align-items: center;
  margin-top: 20px;

  img{
    margin-right: 5px;
    height: 20px;
    width: 20px;
  }
`