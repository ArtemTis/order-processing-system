import React, { useState } from 'react'
import { Button, Modal, Tabs } from 'antd';
import { channelApi } from '../entities/channel/channelApi';
import { IPatterns, ReqStatus } from '../entities/types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../entities/auth/selectors';
import { ACCOUNT_PATH, LOGIN_PATH } from '../shared/config/routerConfig/routeConstants';
import { companyApi } from '../entities/chats/companyApi';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';

const Settings = () => {

  const { data: response, isLoading, isError } = channelApi.useChannelsQuery();

  const [addVk, { data: addVkRes, isLoading: addVkLoad, isError: addVkError }] = channelApi.useAddVkGroupMutation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [areaValue, setAreaValue] = useState('');
  const [activeId, setActiveId] = useState<number>();

  const addVkGroup = async () => {

    try {
      await addVk({
        access_key: "vk1.a.ddg7R-WvdJhcS6ulG9bpQ79Etd1S4_GDdj-pWvCtxtvVscb1j_Giu-tTAo0QfwUSVG4bYMbiYRR6-u_BgeBP8kkhJkgA38Jm_jEJaV81AComaO3_W2LByQw5MWenKy5pPj9YvDii96ljabNXXJLLp90-JBPELWnzeB_5uEfxy-T9FWtrkV8B9ddTlHTc3uTvYTeZG9NbUV21bA_mDGZZxA",
        group_id: 220160293
      }).unwrap();

    } catch (error) {
      console.log(error);

    }
  }

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

  return (
    <div>
      Settings
      {
        isLoading &&
        <p>Loading...</p>
      }

      <StyledTabs
        tabPosition={"left"}
        // @ts-ignore
        items={response?.data.map((channel, i) => {
          const id = String(i + 1);
          return {
            label: channel.name,
            key: channel.id,
            children: `Content of Tab ${channel.name}`,
          };
        })}
      />

      <button onClick={addVkGroup}>Add Vk Group</button>
      {
        addVkRes &&
        <p>{addVkRes.message}</p>
      }

      {/* {
        response &&
        response.data?.map(chanal => (
          <div key={chanal.id}>
            {chanal.name}
          </div>
        ))
      } */}

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
                  <h6 key={mess.id}>{mess.text}</h6>
                ))
              }
              <Button onClick={() => addPatternModal(pattern.id)}>Add pattern</Button>
            </>)
          };
        })}
      />


      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
      </Modal>
    </div>
  )
}

export default Settings

const StyledTabs = styled(Tabs)`
  
 .ant-tabs-tab-active{
  background-color:  #667eea;
 }

 .ant-tabs-tab:hover{
  color: #667eea;
 }
`
