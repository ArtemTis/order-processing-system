import React, { useEffect, useState } from 'react'
import { companyApi } from '../entities/chats/companyApi';
import moment from 'moment';
import useEcho from '../shared/config/hooks/useEcho';
import { IChatMessages } from '../entities/types';
import { useSelector } from 'react-redux';
import { selectAllChats } from '../entities/chats/selectors';
import { Avatar, message } from 'antd';

interface IMessageProps {
    chatId?: string,
    messages: IChatMessages[]
}

const Messages: React.FC<IMessageProps> = ({ chatId, messages }) => {

    const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

    // const { data: responseMessages, isLoading, isError } = companyApi.useChatsMessagesQuery(+(chatId ?? -1));

    // const { echo } = useEcho();

    // const [newMessages, setNewMessages] = useState<IChatMessages[]>([]);

    // // console.log(responseMessages?.data);

    // echo.private(`chats.${chatId}`)
    //     .listen('.message.new', (message: IChatMessages) => {
    //         console.log(message);
    //         // console.log(responseMessages);

    //         const uniq = new Set([message, ...newMessages, ...responseMessages?.data ?? []].map(e => JSON.stringify(e)));

    //         const res = Array.from(uniq).map(e => JSON.parse(e));

    //         console.log(res);


    //         setNewMessages(res)
    //     });

    // useEffect(() => {
    //     setNewMessages(responseMessages?.data ?? [])

    // }, [responseMessages?.data])

    // useEffect(() => {
    //     setNewMessages(responseMessages?.data ?? [])

    //     return () => {
    //         echo.leave(`chats.${chatId}`)
    //     }
    // }, [])


    return (
        <div className="messages-wrapper">
            {/* {
                isLoading &&
                <p>Загрузка...</p>
            }
            {
                isError &&
                <p>Упс, какая-то ошибочка...</p>
            } */}
            {
                messages &&
                // [...newMessages, ...responseMessages?.data].map((message, i) => {
                    messages.map((message, i) => {
                    // responseMessages?.data.map((message, index) => {
                    // const itsMe = message.from_user_id.name.trim().toLowerCase() === Role.ADMIN;
                    const itsMe = !!message.from_user_id?.name;

                    const date = moment(message.created_at).format("hh:mm | D MMM")

                    return itsMe ? (
                        <div className="outgoing-chats" key={message.id}>
                            <div className="outgoing-chats-img">
                                {/* <img src="user1.png" /> */}
                            </div>
                            <div className="outgoing-msg">
                                <div className="outgoing-chats-msg">
                                    <p className="multi-msg">
                                        {message.text}
                                    </p>
                                    <span className="time">{date}</span>
                                </div>
                            </div>
                        </div>
                    )
                        : (
                            <div className="received-chats" key={message.id}>
                                <div className="received-chats-img">
                                    {/* <img src="user2.png" /> */}
                                    <Avatar size={18}
                                        icon={<img src={chatById?.client_contact.photo_url ?? ''}
                                            alt="Avatar" />}
                                    />
                                </div>
                                <div className="received-msg">
                                    <div className="received-msg-inbox">
                                        <p>
                                            {message.text}
                                        </p>
                                        <span className="time">{date}</span>
                                    </div>
                                </div>
                            </div>
                        )
                })
            }

        </div>
    )
}

export default Messages