import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { UserOutlined } from '@ant-design/icons'

const ChatItem = () => {
    return (
        <StyledChatItem>
            <Avatar size={54} icon={<UserOutlined />} />

            <StyledName>
                <h3>Пользователь 1</h3>
                <p>Телеграм</p>
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