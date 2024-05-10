import React from 'react'
import { Tabs } from 'antd';
import { channelApi } from '../entities/channel/channelApi';
import { ReqStatus } from '../entities/types';

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