import React, { useState } from 'react'
import { Button, Input, Modal, Tabs } from 'antd';
import { channelApi } from '../entities/channel/channelApi';
import { IPatterns, ReqStatus } from '../entities/types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../entities/auth/selectors';
import { ACCOUNT_PATH, LOGIN_PATH } from '../shared/config/routerConfig/routeConstants';
import { companyApi } from '../entities/chats/companyApi';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import Channals from '../widgets/Channals';
import AddPatterns from '../widgets/AddPatterns';
import Statuses from '../widgets/Statuses';


const Settings = () => {

  const isAuthorised = !!useSelector(selectCurrentUser)
  if (!isAuthorised) {
    return <Navigate to={`/${ACCOUNT_PATH}/${LOGIN_PATH}`} />
  }


  const items = [
    {
      key: '1',
      label: 'Каналы',
      children: <Channals />
      ,
    },
    {
      key: '2',
      label: 'Шаблоны ответов',
      children: (
        <AddPatterns />
      ),
    },
    {
      key: '3',
      label: 'Статусы сделок',
      children: (
        <Statuses />
      )
    }
  ];

  return (
    <StyledWrapper>
      <h1>Настройки</h1>

      <StyledMainTabs defaultActiveKey='1' items={items} />

    </StyledWrapper>
  )
}

export default Settings;

export const StyledWrapper = styled.div`
    padding: 20px 0 0 20px;
    background-color: #f5f5f5;
    height: 100vh;

    h1{
      font-size: 22px;
      margin-bottom: 20px;
    }
`

export const StyledButton = styled(Button)`
  border-radius: 7px;
  /* color: #f1f1f1; */
  border: none;
  background-color:  #667eea;

`

export const StyledTabs = styled(Tabs)`
    
  .ant-tabs-tab-active{
    background-color:  #667eea;
    div{
      color: #f0f0f0 !important;
    }
  }

  :where(.css-dev-only-do-not-override-1gnzlby).ant-tabs .ant-tabs-tab.ant-tabs-tab-disabled{
    cursor: pointer;
  }

  [data-node-key="999"]{
    background-color: #5943af;
    border-radius: 7px;
    cursor: pointer !important;
    div{
      color: #f0f0f0 !important;
    }
  }

  .ant-tabs-tab:hover{
    color: #667eea;
  }

  .ant-tabs-nav-list{
    padding-right: 10px;
  }

  .ant-tabs-ink-bar{
    background: #667eea;
  }

  h2{
    font-size: 18px;
  }

  .pattern-text{
    font-size: 16px;
    margin-bottom: 10px;
  }
`

const StyledMainTabs = styled(Tabs)`

  /* .ant-tabs-tab{
    border-radius: 10px;
  } */

  .ant-tabs-tab{
    font-size: 16px;
  }

  .channal-title{
    font-size: 22px;
    font-weight: 500;
    margin: 0px 0 15px;
  }
    
  .ant-tabs-tab-active{
    background-color:  #667eea;
    border-radius: 7px;

    div{
      color: #f0f0f0 !important;
    }
  }

  .ant-tabs-tab:hover{
  color: #667eea;
  }

  .ant-tabs-tab{
    padding: 7px 12px;
  }

  .ant-tabs-nav-list{
    padding-bottom: 10px;
  }

  .ant-tabs-ink-bar{
    background: #667eea;
  }
`
