import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import ChatItem from '../widgets/ChatItem'
import { ACCOUNT_PATH, CHAT_PATH, LOGIN_PATH } from '../shared/config/routerConfig/routeConstants'
import { companyApi } from '../entities/chats/companyApi'
import { useDispatch, useSelector } from 'react-redux'
import { setChats } from '../entities/chats/chatSlice'
import useEcho from '../shared/config/hooks/useEcho'
import { IChatSnippet } from '../entities/types'
import { selectCurrentUser } from '../entities/auth/selectors'

const Chats = () => {

  const { data: response, isLoading, isError } = companyApi.useChatsByCompanyQuery(11);

  const { echo } = useEcho();

  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.data) {
      dispatch(setChats(response?.data));
    }
  }, [response?.data])

  // const [newChats, setNewChats] = useState<IChatSnippet[]>([]);

  echo.private(`chats.new`)
    .listen('.chat.new', (message: IChatSnippet) => {
      console.log(message);
      // setNewChats([...newChats, message])
    });

  useEffect(() => {

    return () => {
      echo.leave(`chats.new`)
    }
  })

  const isAuthorised = !!useSelector(selectCurrentUser)
  if (!isAuthorised) {
    return <Navigate to={`/${ACCOUNT_PATH}/${LOGIN_PATH}`} />
  }

  return (
    <StyledChatsWrapper>
      <StyledChats>
        {
          response?.data.map((item, index) =>
            <Link to={`${CHAT_PATH}/${item.id}`} key={item.id}>
              <ChatItem key={item.id} data={item} />
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

  /* background-color: #533f5c; */
  /* background-color: #667eea; */
  /* background-color: #3f3f3f; */
  /* background-color: #213698; */
  background-color: #8296ee;
  /* background-color: #5943af; */

  overflow: scroll;
  
  height: 100vh;

  scrollbar-width: none;
  /* ::-webkit-scrollbar {
    display: none;
  } */
`

