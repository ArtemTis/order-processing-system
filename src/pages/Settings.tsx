import React from 'react'
import { Tabs } from 'antd';
import { channelApi } from '../entities/channel/channelApi';
import { ReqStatus } from '../entities/types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../entities/auth/selectors';
import { ACCOUNT_PATH, LOGIN_PATH } from '../shared/config/routerConfig/routeConstants';

const Settings = () => {

  const { data: response, isLoading, isError } = channelApi.useChannelsQuery();

  const [addVk, { data: addVkRes, isLoading: addVkLoad, isError: addVkError }] = channelApi.useAddVkGroupMutation();


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
  

  return (
    <div>
      Settings
      {
        isLoading &&
        <p>Loading...</p>
      }

      <Tabs
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

    </div>
  )
}

export default Settings