import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ACCOUNT_PATH, LOGIN_PATH, PROFILE_PATH } from '../../shared/config/routerConfig/routeConstants';
import { Form, FormProps, Input } from 'antd';
import { StyledButton } from '../Settings';
import { userApi } from '../../entities/auth/userApi';
import { useDispatch } from 'react-redux';
import { ILogin, IRegister } from '../../entities/types';
import { setCredentials } from '../../entities/auth/authSlice';
import styled from 'styled-components';

type FieldType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sendInfo, { isError, isLoading, data }] = userApi.useRegisterMutation();

  const login = () => {
    navigate(`/${ACCOUNT_PATH}/${LOGIN_PATH}`)
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const defaultValues: IRegister = {
      name: 'new test',
      email: "user@mail.ru",
      password: '12345678',
      password_confirmation: '12345678'
    }
    try {
      const user = await sendInfo(values).unwrap();
      dispatch(setCredentials(user))
      // navigate(`/${ACCOUNT_PATH}/${PROFILE_PATH}`);
      navigate(`/${PROFILE_PATH}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledWrapper>

      <Form
        name="basic"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        style={{
          maxWidth: 900,
          width: 500
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
        >
          <h1>Регистрация</h1>
        </Form.Item>
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            {
              required: true,
              message: 'Введите имя',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Эл. почта"
          name="email"
          rules={[
            {
              required: true,
              message: 'Введите электронную почту',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Повторите пароль"
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: 'Введите пароль ещё раз!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
        >
          <h5>Уже есть аккаунт? <Link to={`/${ACCOUNT_PATH}/${LOGIN_PATH}`}>Авторизоваться</Link></h5>
        </Form.Item>

        <Form.Item
        >
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>         
            {
              isLoading && <p>Загрузка...</p>
            }
            {
              isError && <p style={{ color: '#c20707', marginBottom: '10px' }}>Ошибка регистрации</p>
            }
            <StyledButton type='primary' htmlType="submit" onClick={login}>
              Зарегистрироваться
            </StyledButton>
          </div>
        </Form.Item>
      </Form>
    </StyledWrapper>
  )
}

export default Register

const StyledWrapper = styled.div`
  /* background-color: #303030; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1{
    font-size: 30px;
    font-weight: 500;
    text-align: center;
  }

  label{
    width: 145px;
  }

  /* .ant-col-offset-8 */
`