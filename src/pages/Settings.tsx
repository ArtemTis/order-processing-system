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



const Settings = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [areaValue, setAreaValue] = useState('');
  const [activeId, setActiveId] = useState<number>();


  const isAuthorised = !!useSelector(selectCurrentUser)
  if (!isAuthorised) {
    return <Navigate to={`/${ACCOUNT_PATH}/${LOGIN_PATH}`} />
  }


  const { data: res, isLoading: isLoad, isError: isErr } = companyApi.useGetPatternsByTypeQuery();
  const [sendNewPattern, { isLoading: isLoade, isError: isErro }] = companyApi.useAddPatternMutation();

  const addPatternModal = (id: number) => {
    setIsModalOpen(true);
    setActiveId(id)
  }

  const handleOk = () => {
    setIsModalOpen(false);
    sendNewPattern({
      text: areaValue,
      type_of_message_pattern_id: activeId ?? -1
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  const items = [
    {
      key: '1',
      label: 'Каналы',
      children: <Channals/>
      ,
    },
    {
      key: '2',
      label: 'Шаблоны ответов',
      children: (
        <StyledTabs
          tabPosition={"left"}
          // @ts-ignore
          items={res?.data.map((pattern, i) => {
            const id = String(i + 1);
            return {
              label: pattern.name,
              key: pattern.id,
              children: (<>
                {
                  pattern.messagePatterns.map(mess => (
                    <h6 className='pattern-text' key={mess.id}>{mess.text}</h6>
                  ))
                }
                <StyledButton type='primary' onClick={() => addPatternModal(pattern.id)}>Добавить шаблон</StyledButton>
              </>)
            };
          })}
        />
      ),
    }
  ];

  return (
    <StyledWrapper>
      <h1>Настройки</h1>

      <StyledMainTabs defaultActiveKey='1' items={items} />

      <StyledModal title="Добавить шаблон" open={isModalOpen} onOk={handleOk}
        okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
        <p>Введите текст новго шаблона</p>
        <TextArea
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
          placeholder="Текст шаблона"
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />
      </StyledModal>
    </StyledWrapper>
  )
}

export default Settings;

const StyledWrapper = styled.div`
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

const StyledModal = styled(Modal)`
    .ant-modal-content{
      border-radius: 7px;

      textarea{
        border-radius: 7px;
      }
      button{
        border-radius: 7px;
      }
    }

  .ant-input-outlined{
    background: white;
  }

  textarea:hover{
    border-width: 1px;
    border-style: solid;
    border-color: #d9d9d9;
  }

  p{
    font-size: 16px;
    margin-bottom: 10px;
  }
`
