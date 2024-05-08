import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { UserOutlined } from '@ant-design/icons'
import { IChatSnippen } from '../entities/types'
import { useParams } from 'react-router-dom'

interface ChatItemProps {
    data: IChatSnippen;
}

const ChatItem: React.FC<ChatItemProps> = ({ data }) => {

    const { id } = useParams();

    // console.log(data);
    console.log(data.last_message?.created_at);
    // console.log(data.last_message.created_at);

    const time = data.last_message?.created_at.slice(11, 16);
    console.log(time);


    return (
        <StyledChatItem>
            <Avatar size={54} icon={<UserOutlined />} />

            <StyledName>
                <h3>{data.name}</h3>
                <div style={{ display: 'flex' , justifyContent: 'space-between'}}>

                    {
                        data.last_message?.text &&
                        <p style={{maxWidth: '60%'}}>{data.last_message.text}</p>
                    }
                    {
                        data.last_message?.created_at &&
                        <p>{time ?? '9:11'}</p>
                    }
                </div>
            </StyledName>

        </StyledChatItem>
    )
}

export default ChatItem

const StyledChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  max-width: 300px;
  padding: 5px;

  cursor: pointer;
  &:hover{
    background-color: #3b2966;
  }
`

const StyledName = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;

    h3{
        font-size: 16px;
        font-weight: 500;
        color: white;
    }
    p{
        font-size: 14px;
        font-weight: 400;
        color: #979797;
    }
`