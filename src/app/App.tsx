import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConfigProvider, theme } from 'antd';

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#0f4e34',
        borderRadius: 2,
        

        // Alias Token
        colorBgContainer: '#f6ffed',
        
      },
      algorithm: theme.darkAlgorithm,
    }}
  >

  </ConfigProvider>
  );
}

export default App;
