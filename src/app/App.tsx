import React from 'react';
import logo from './logo.svg';
import '../app/styles/App.css';
import { ConfigProvider, theme } from 'antd';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from '../shared/config/routerConfig/router';
import { Provider } from 'react-redux'
import { store } from './store/store';
import Chat from '../pages/Chat';
import moment from 'moment';

function App() {
  moment.locale('ru')

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#818180',
          // colorPrimary: '#667eea',
          borderRadius: 2,


          // Alias Token
          // colorBgContainer: '#6D31ED',
          colorBgContainer: '#aeacb1',

        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <RouterProvider router={router} />
        {/* </BrowserRouter> */}
      </Provider>
    </ConfigProvider>
  );
}

export default App;
