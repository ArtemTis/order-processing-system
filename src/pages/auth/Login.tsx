import React, { useRef, useState } from 'react'
import { userApi } from '../../entities/auth/userApi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_PATH, PROFILE_PATH, REGISTER_PATH } from '../../shared/config/routerConfig/routeConstants';
import { useAppDispatch } from '../../app/store/store';
import { setCredentials } from '../../entities/auth/authSlice';
import { useDispatch } from 'react-redux';
import './Login.css'

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
      // navigate(`/${PROFILE_PATH}`);
      navigate(PROFILE_PATH);
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

      <div className="login-wrapper">
        <div className="container" id="container" ref={containerRef}>
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              {/* <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div> */}
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
              {/* <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div> */}
              <span>or use your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              {/* <a href="#">Forgot your password?</a> */}
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
      </div>

    </StyledWrapper>
  )
}

export default Login

const StyledWrapper = styled.div`
  /* background-color: #303030; */
  height: 100vh;
`