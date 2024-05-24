import React, { useRef, useState } from 'react'
import { userApi } from '../../entities/auth/userApi';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH, PROFILE_PATH, REGISTER_PATH } from '../../shared/config/routerConfig/routeConstants';
import { useAppDispatch } from '../../app/store/store';
import { setCredentials } from '../../entities/auth/authSlice';
import { useDispatch } from 'react-redux';
// import './Login.css'
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { StyledButton } from '../Settings';
import { ILogin } from '../../entities/types';

type FieldType = {
  email?: string;
  password?: string;
};

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
      // navigate(`/${ACCOUNT_PATH}/${PROFILE_PATH}`);
      navigate(`/${PROFILE_PATH}`);

      window.localStorage.setItem('token', user.access_token)
    } catch (err) {
      console.log(err);

    }
  }

  const register = () => {
    navigate(`/${ACCOUNT_PATH}/${REGISTER_PATH}`);
  }





  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');


  signUpButton?.addEventListener('click', () => {
    container?.classList.add("right-panel-active");
  });

  signInButton?.addEventListener('click', () => {
    container?.classList.remove("right-panel-active");
  });



  const signUpButtonRef = useRef<HTMLButtonElement>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  // signUpButtonRef.current?.addEventListener('click', () => {
  //   containerRef.current?.classList.add("right-panel-active");
  // });

  // signInButtonRef.current?.addEventListener('click', () => {
  //   containerRef.current?.classList.remove("right-panel-active");
  // });



  // const [panelActive, setPanelActive] = useState('');

  // const handleClass = () => {
  //   if (!panelActive) {
  //     setPanelActive('right-panel-active')
  //   }else{
  //     setPanelActive('')
  //   }
  // }

  const onFinish: FormProps<ILogin>['onFinish'] = async (values) => {
    const defaultValues: ILogin = {
      email: "user@mail.ru",
      password: '12345678'
    }
    console.log('Success:', defaultValues);
    try {
      const user = await sendInfo(values).unwrap();
      dispatch(setCredentials(user))
      // navigate(`/${ACCOUNT_PATH}/${PROFILE_PATH}`);
      if (!isLoading) {
        navigate(`/${PROFILE_PATH}`);
      }
    } catch (err) {
      console.log(err);

    }
  };

  const onFinishFailed: FormProps<ILogin>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledWrapper>
      {/*
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
      </button> */}

      {/* <div className="login-wrapper">
        <div className="container" id="container" ref={containerRef}>
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
      
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button onClick={register}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
      
              <span>or use your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button onClick={login}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn" ref={signInButtonRef} >Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" ref={signUpButtonRef}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Form
        name="basic"
        style={{
          maxWidth: 900,
          width: 500
        }}
        initialValues={{
          email: "user@mail.ru",
          password: '12345678'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
        >
          <h1>Авторизация</h1>
        </Form.Item>
        <Form.Item
          label="Эл. почта"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
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
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
        >
          <h5>Нет аккаунта? <Link to={`/${ACCOUNT_PATH}/${REGISTER_PATH}`}>Зарегистрироваться</Link></h5>
        </Form.Item>

        <Form.Item
        >
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {
              isLoading && <p style={{ marginBottom: '10px' }}>Загрузка...</p>
            }
            {
              isError && <p style={{ color: '#c20707', marginBottom: '10px' }}>Ошибка авторизации</p>
            }
            <StyledButton type='primary' htmlType="submit">
              {/* onClick={login} */}
              Авторизоваться
            </StyledButton>
          </div>
        </Form.Item>
      </Form>

    </StyledWrapper >
  )
}

export default Login

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
    width: 87px;
  }

  /* .ant-col-offset-8 */
`

const StyledInput = styled(Input)`
  /* border-radius: 7px; */

`

// const StyledLinks = styled.div`
//   display: flex;
//   justify-content: space-between;
// `