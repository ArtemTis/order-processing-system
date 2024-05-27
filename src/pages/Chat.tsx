import React, { useCallback, useEffect, useRef, useState } from 'react'
import './chat.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Cascader, CascaderProps, Drawer, Popover } from 'antd'
import { companyApi } from '../entities/chats/companyApi'
import { useParams } from 'react-router-dom'
import 'moment/locale/ru'
import Messages from '../widgets/Messages'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../entities/auth/selectors'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import useEcho from '../shared/config/hooks/useEcho'
import { selectAllChats } from '../entities/chats/selectors'
import { RootState } from '../app/store/store'
import Pattern from '../widgets/Pattern'
import { useChat } from '../shared/config/hooks/useChat'
import { StyledButton } from './Settings'
import moment from 'moment'
import styled from 'styled-components'
import star from '../shared/assets/star.svg'
import send from '../shared/assets/send.svg'
import { IChatMessages } from '../entities/types'
import { messagesApi } from '../entities/chats/messagesApi'
import { dealsApi } from '../entities/chats/dealsApi'
import Deals from '../widgets/DealsPage'
import ChatPatterns from '../widgets/ChatPatterns'

enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const Chat = () => {

  const { chatId } = useParams();

  const [inputValue, setInputValue] = useState('');
  const scroll = useRef<HTMLSpanElement>(null);

  const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

  const [sendText, { isError, isLoading, data }] = messagesApi.useSendMessageMutation();

  const sendMessage = async () => {
    try {
      if (inputValue) {
        await sendText({ chatId: +(chatId ?? -1), text: inputValue }).unwrap();
        // inputRef.current.value = "";
        setInputValue('');
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [trigger, { data: responseMessages, isLoading: messLoad, isError: messErr }] = messagesApi.useLazyChatsMessagesQuery();

  const { newMessages, setNewMessages, uniqueById } = useChat(chatId ?? '', responseMessages);

  const [messages, setMessages] = useState<IChatMessages[]>([]);


  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [newMessages])

  useEffect(() => {
    trigger(+ (chatId ?? -1))
    setNewMessages(responseMessages?.data ?? [])
    setMessages(uniqueById([...messages, ...responseMessages?.data ?? []]))
  }, [chatId, responseMessages?.data])


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div className="container">

      <div className="msg-header">
        <div className="container1">

          {/* <img src="user1.png" className="msgimg" /> */}
          <Avatar size={26} icon={<img src={chatById?.client_contact.photo_url ?? ''} alt="User avatar" />} />

          <div className="active">
            <p>{chatById?.name}</p>
          </div>

        </div>
        <StyleButton type='primary' onClick={showDrawer}>Список сделок</StyleButton>
      </div>

      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">

            <div className="msg-page">

              <Messages chatId={chatId} messages={newMessages} />

              <span ref={scroll}></span>

            </div>
          </div>


          <div className="msg-bottom">

            <ChatPatterns setInputValue={setInputValue}/>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write message..."
                // ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <span className="input-group-text send-icon" onClick={sendMessage}>
                <i className="bi bi-send"></i>
                <img src={send} alt="Отправить" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <Deals chatId={chatId} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Chat



const StyleButton = styled(Button)`
  padding: 0px 10px;
  border-radius: 7px;
  background-color: #5943af;
`
// style={{ height: '20px', padding: '0px', marginLeft: '10px' }}