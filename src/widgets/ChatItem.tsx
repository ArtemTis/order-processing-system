import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { UserOutlined } from '@ant-design/icons'
import { IChatSnippet } from '../entities/types'
import { useLocation, useParams } from 'react-router-dom'

import vk from '../shared/assets/vk.svg'
import tg from '../shared/assets/tg.svg'

interface ChatItemProps {
    data: IChatSnippet;
}

const ChatItem: React.FC<ChatItemProps> = ({ data }) => {

    const { id } = useParams();

    const location = useLocation();

    const activeChat = +location.pathname.split('/')[3]

    const time = data.last_message?.created_at.slice(11, 16);


    return (
        <StyledChatItem style={activeChat === data.id ? { backgroundColor: '#5943af' } : { backgroundColor: '' }}>
            <Avatar
                size={54}
                icon={
                    data.client_contact.photo_url
                        ? <img src={data.client_contact.photo_url} alt="Avatar" />
                        : <UserOutlined />}
            />

            <StyledName>
                <div>
                    <h3>{data.name}</h3>
                    <img src={data.channel.name === 'VKGroup' ? vk : tg} alt="channel icon" />
                </div>
                <StyledContainer>
                    {
                        data.last_message?.text &&
                        <p>{data.last_message.text}</p>
                    }
                    {
                        data.last_message?.created_at &&
                        <span>{time ?? '9:11'}</span>
                    }

                </StyledContainer>
            </StyledName>

        </StyledChatItem>
    )
}

export default ChatItem

const StyledChatItem = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 7px;

  max-width: 300px;
  padding: 5px;
  cursor: pointer;

  background-color: #667eea;
  border-radius: 7px;

  &:hover{
    /* background-color: #5943af; */
    background-color: #4a64d6;
    border-radius: 7px;
  }
`

const StyledName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    margin: 5px 0;

    >div{
        display: flex;
        justify-content: space-between;
        align-items: center;

        img{
            width: 20px;
        }
    }

    h3{
        font-size: 16px;
        font-weight: 500;
        color: white;
        margin-left: 0;
    }
    p,span{
        font-size: 14px;
        font-weight: 400;
        /* color: #979797; */
        color: #e0dfdf;
    }
    
    p{
        white-space: nowrap; /* Текст не переносится */
        overflow: hidden; /* Обрезаем всё за пределами блока */
        text-overflow: ellipsis; /* Добавляем многоточие */

        /* width: auto; */
        width: 100%;
    }
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;
`