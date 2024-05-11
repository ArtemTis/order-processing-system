import React, { useCallback, useEffect, useRef, useState } from 'react'
import './chat.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
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

enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

//@ts-ignore
// window.Pusher = Pusher;

const Chat = () => {

  const { chatId } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const scroll = useRef<HTMLSpanElement>(null);


  const [sendText, { isError, isLoading, data }] = companyApi.useSendMessageMutation();

  const sendMessage = async () => {

    try {
      if (inputRef.current?.value) {
        await sendText({ chatId: +(chatId ?? -1), text: inputRef.current?.value }).unwrap();
        inputRef.current.value = "";
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      }

    } catch (err) {
      console.log(err);

    }
  }



  // useEffect(() => {
  //   getMessages();
  //   connectWebSocket();

  //   return () => {
  //     window.Echo.leave(webSocketChannel);
  //   }
  // }, []);

  // const changeTextMessage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTextMessage(e.value);
  // },[])


  const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

  return (
    <div className="container">

      <div className="msg-header">
        <div className="container1">
          {/* <img src="user1.png" className="msgimg" /> */}
          <Avatar size={26} icon={<img src={chatById?.client_contact.photo_url ?? ''} alt="User avatar" />} />
          
          <div className="active">
            <p>User name</p>
          </div>
        </div>
      </div>

      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">

            <div className="msg-page">

              <Messages chatId={chatId} />

              <span ref={scroll}></span>

              {/* <div className="received-chats">
                <div className="received-chats-img">
                  <img src="user2.png" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>
                      Hi !! This is message from Riya . Lorem ipsum, dolor sit
                      amet consectetur adipisicing elit. Non quas nemo eum,
                      earum sunt, nobis similique quisquam eveniet pariatur
                      commodi modi voluptatibus iusto omnis harum illum iste
                      distinctio expedita illo!
                    </p>
                    <span className="time">18:06 PM | July 24</span>
                  </div>
                </div>
              </div>

              <div className="outgoing-chats">
                <div className="outgoing-chats-img">
                  <img src="user1.png" />
                </div>
                <div className="outgoing-msg">
                  <div className="outgoing-chats-msg">
                    <p className="multi-msg">
                      Hi riya , Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Illo nobis deleniti earum magni
                      recusandae assumenda.
                    </p>
                    <p className="multi-msg">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>

                    <span className="time">18:30 PM | July 24</span>
                  </div>
                </div>
              </div> */}

            </div>
          </div>


          <div className="msg-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write message..."
                ref={inputRef}

              />

              <span className="input-group-text send-icon" onClick={sendMessage}>
                <i className="bi bi-send"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat