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
          // colorPrimary: '#818180',
          // colorPrimary: '#667eea',

          // colorPrimary: '#f1f1f1',
          borderRadius: 0,


          colorPrimaryHover: '#5943af'
          // Alias Token
          // colorBgContainer: '#6D31ED',
          // colorBgContainer: '#aeacb1',

          // colorBgContainer: '#667eea',

        },
        // algorithm: theme.darkAlgorithm,
        algorithm: theme.defaultAlgorithm,
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
