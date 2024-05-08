import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import ChatItem from '../widgets/ChatItem'
import { CHAT_PATH } from '../shared/config/routerConfig/routeConstants'
import { companyApi } from '../entities/company/companyApi'

const Chats = () => {

  const { data:  response, isLoading, isError } = companyApi.useChatsByCompanyQuery(11);

  console.log(response?.data);
  

  return (
    <StyledChatsWrapper>
      <StyledChats>
        {
          response?.data.map((item, index) =>
            <Link to={`${CHAT_PATH}/${item.id}`} key={item.id}>
              <ChatItem key={item.id} data={item}/>
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

  min-width: 250px;
  /* width: 310px; */
  max-width: 320px;
  padding: 10px;

  background-color: #533f5c;

  overflow: scroll;
  
  height: 100vh;

  scrollbar-width: none;
  /* ::-webkit-scrollbar {
    display: none;
  } */
`

