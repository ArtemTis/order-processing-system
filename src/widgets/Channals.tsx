import React, { useState } from 'react'
import { channelApi } from '../entities/channel/channelApi';
import { Input, message } from 'antd';
import { StyledButton, StyledTabs } from '../pages/Settings';
import styled from 'styled-components';

interface IVKgroup {
    access_key?: string,
    group_id?: number
}

const Channals = () => {

    const { data: response, isLoading, isError } = channelApi.useChannelsQuery();

    const [addVk, { data: addVkRes, isLoading: addVkLoad, isError: addVkError }] = channelApi.useAddVkGroupMutation();


    const [vkValue, setVkValue] = useState<IVKgroup>();

    const [messageApi, contextHolder] = message.useMessage();


    const addVkGroup = async () => {

        try {
            await addVk({
                access_key: "vk1.a.ddg7R-WvdJhcS6ulG9bpQ79Etd1S4_GDdj-pWvCtxtvVscb1j_Giu-tTAo0QfwUSVG4bYMbiYRR6-u_BgeBP8kkhJkgA38Jm_jEJaV81AComaO3_W2LByQw5MWenKy5pPj9YvDii96ljabNXXJLLp90-JBPELWnzeB_5uEfxy-T9FWtrkV8B9ddTlHTc3uTvYTeZG9NbUV21bA_mDGZZxA",
                group_id: 220160293
            }).unwrap();
            messageApi.open({
                type: 'success',
                content: 'Вы добавили группу ВК',
            });
        } catch (error) {
            console.log(error);

        }
    }

    const channalsTabs = [
        {
            key: '1',
            label: 'ВК',
            children: (
                <StyledChannal>
                    <h2>Добавьте группу ВК</h2>
                    <p>Вы можете добавить группы ВКОНТАКТЕ, созданные вами или в которых вы являетесь администратором. Чтобы добавить их, войдите в группу VK и скопируйте токен и айди</p>
                    <div className='channal-item'>
                        <div>

                            <Input value={vkValue?.access_key} onChange={(e) => setVkValue({ ...vkValue, access_key: e.target.value })} />
                        </div>
                        <div>

                            <Input type='number' value={vkValue?.group_id} onChange={(e) => setVkValue({ ...vkValue, group_id: +e.target.value })} />
                        </div>
                    </div>
                    <StyledButton type='primary' onClick={addVkGroup}>Добавить группу ВК</StyledButton>
                    {
                        isError &&
                        <p style={{ color: '#c20707', marginBottom: '10px' }}>Произошла ошибка</p>
                    }
                    {
                        addVkRes &&
                        <p>{addVkRes.message}</p>
                    }
                </StyledChannal>
            )
        }
    ]

    return (
        <div>
            {
                isLoading &&
                <p>Loading...</p>
            }

            <h2 className='channal-title'>Подключение каналов</h2>
            <StyledTabs
                tabPosition={"left"}
                // @ts-ignore
                items={response?.data.map((channel, i) => {
                    const id = String(i + 1);
                    return {
                        label: channel.name,
                        key: channel.id,
                        children: (!!channel.isConnected ? channalsTabs[i]?.children : 
                            <h2>Канал уже добавлен</h2>
                         ),
                    };
                })}
            />

            {contextHolder}
        </div>
    )
}

export default Channals


const StyledChannal = styled.div`
  input{
    width: 300px;
  }

  .channal-item{ 
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }

  h2{
    font-size: 18px;
    font-weight: 500;
  }

  p{
    font-size:16px;
    max-width: 50vw;
  }
`