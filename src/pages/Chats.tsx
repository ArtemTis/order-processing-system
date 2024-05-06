import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import ChatItem from '../widgets/StyledChatItem'
import { CHAT_PATH } from '../shared/config/routerConfig/routeConstants'

const Chats = () => {
  return (
    <StyledChatsWrapper>
      <StyledChats>
        {
          [0, 1, 4, 5, 1, 2, 6, 2, 4, 6, 7, 8].map((item, index) =>
            <Link to={`${CHAT_PATH}/${index}`} key={index}>
              <ChatItem key={index} />
            </Link>
          )
        }

      </StyledChats>

      <Outlet />
    </StyledChatsWrapper>
  )
}

export default Chats

const StyledChatsWrapper = styled.div`
  display: flex;
  scrollbar-width: none;
`

const StyledChats = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: stretch; */

  min-width: 220px;
  max-width: 350px;
  padding: 10px;

  background-color: #533f5c;

  overflow: scroll;
  
  height: 100vh;

  scrollbar-width: none;
  /* ::-webkit-scrollbar {
    display: none;
  } */
`

