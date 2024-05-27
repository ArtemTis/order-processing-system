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



const ChatNew = () => {

    const { chatId } = useParams();

    // const { echo } = useEcho();
    const token = useSelector(selectAuthToken);

    const [inputValue, setInputValue] = useState('');

    const [newMessages, setNewMessages] = useState<IChatMessages[]>([]);

    const [echoInstance, setEchoInstance] = useState<Echo | null>(null);

    const {data: responseMessages, isLoading: messLoad, isError: messErr, refetch } = messagesApi.useChatsMessagesQuery(+(chatId ?? -1));

    // const [trigger, { data: responseMessages, isLoading: messLoad, isError: messErr }] = messagesApi.useLazyChatsMessagesQuery();

    console.log(responseMessages);


    useEffect(() => {
        // trigger(+ (chatId ?? -1))
        setNewMessages(responseMessages?.data ?? []);

        const echoOptions = {
            broadcaster: 'reverb',
            key: 'yxktbi6auxglqdxakn5d',
            wsHost: '78.24.223.82',
            wsPort: 2323,
            wssPort: 2323,
            // cluster: config.pusher.cluster,
            forceTLS: false,
            enabledTransports: ['ws', 'wss'],
            //authEndpoint is your apiUrl + /broadcasting/auth
            authEndpoint: "http://tisho.creatrix-digital.ru/api/broadcasting/auth",
            // As I'm using JWT tokens, I need to manually set up the headers.
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            },
        };
    
        const echo = new Echo(echoOptions);

        echo.private(`chats.${chatId}`)
            .listen('.message.new', (message: IChatMessages) => {
                console.log(message);

                setNewMessages(prev => [message, ...prev, ...responseMessages?.data ?? []])
            });

        setEchoInstance(echo);

        return () => {
            echo.leave(`chats.${chatId}`)
            setNewMessages([]);
            setEchoInstance(null);
        }

    }, [chatId])



























    const scroll = useRef<HTMLSpanElement>(null);

    const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

    const [sendText, { isError, isLoading, data }] = messagesApi.useSendMessageMutation();

    const sendMessage = async () => {
        try {
            if (inputValue) {
                await sendText({ chatId: +(chatId ?? -1), text: inputValue }).unwrap();
                setInputValue('');
                scroll.current?.scrollIntoView({ behavior: "smooth" });
            }
        } catch (err) {
            console.log(err);

        }
    }





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

                        <ChatPatterns setInputValue={setInputValue} />

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

export default ChatNew



const StyleButton = styled(Button)`
  padding: 0px 10px;
  border-radius: 7px;
  background-color: #5943af;
`
// style={{ height: '20px', padding: '0px', marginLeft: '10px' }}