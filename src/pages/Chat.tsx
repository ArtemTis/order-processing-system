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
  // const inputRef = useRef<HTMLInputElement>(null);
  const scroll = useRef<HTMLSpanElement>(null);

  const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

  const [sendText, { isError, isLoading, data }] = companyApi.useSendMessageMutation();

  // useEffect(() => {
  //   const listener = async (event: KeyboardEvent) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       // callMyFunction();

  //       await sendMessage()
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

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


  const { data: res, isLoading: isLoad, isError: isErr } = companyApi.useGetPatternsByTypeQuery();

  const options: Option[] = (res?.data || []).map(pattern => {
    return {
      value: `${pattern.id}`,
      label: pattern.name,
      children: pattern.messagePatterns.map(patternChild => (
        {
          value: `${patternChild.id}`,
          label: patternChild.text,
        }
      ))
    }
  })


  const onChange: CascaderProps<Option>['onChange'] = (_, selectedOptions) => {

    setInputValue(selectedOptions[1]?.label)

    console.log(inputValue);


    // if (inputRef.current) {
    //   console.log(text);
    //   inputRef.current.value = `aaaaaaaa`;

    // }

    //@ts-ignore
    // inputRef.current = text;
    // setText(selectedOptions.map((o) => o.label).join(', '));
  };

  // const { data: responseMessages}
  //   = companyApi.useChatsMessagesQuery(+ (chatId ?? -1), { refetchOnMountOrArgChange: true });

  const [trigger, { data: responseMessages }] = companyApi.useLazyChatsMessagesQuery();

  const { newMessages, setNewMessages, uniqueById} = useChat(chatId ?? '', responseMessages);

  const [messages, setMessages] = useState<IChatMessages[]>([]);

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [newMessages])

  useEffect(() => {
    trigger(+ (chatId ?? -1))
    setNewMessages(responseMessages?.data ?? [])
    console.log(responseMessages);
    console.log(newMessages);
    setMessages(uniqueById([...messages, ...responseMessages?.data ?? []]))
  }, [chatId, responseMessages?.data])

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { data: deals, isLoading: isLoadingDeals, isError: isErrorDeals } = companyApi.useGetDealsByChatQuery(+(chatId ?? -1));


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


            <Cascader options={options} onChange={onChange}>
              {/* <a>Паттерн ответа</a> */}
              <img src={star} alt="Паттерн ответа" />
            </Cascader>

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

      <StyledDrawer onClose={onClose} open={open} closeIcon={null}>
        <h2 className='drawer-title'>Список сделок:</h2>
        {
          deals?.data.map(deal => {
            const date = moment(deal.status_of_deal_id.created_at).format("hh:mm / D.MM")
            return (
              <StyledDeal key={deal.id}>

                <h2> <span>Название: </span>{deal.desc}</h2>
                <h3> <span>Стоимость: </span> {deal.amount}</h3>
                <h4> <span>Статус: </span> {deal.status_of_deal_id.name}</h4>
                <p>{deal.status_of_deal_id.desc}</p>
                <p>{date}</p>
              </StyledDeal>
            )
          })
        }
      </StyledDrawer>
    </div>
  )
}

export default Chat

const StyledDeal = styled.div`
  /* background-color: #e1e1e1; */
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 10px 3px rgba(34, 60, 80, 0.2);
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  h2{
    font-size: 20px;
    
  }
  h3{
    font-size: 20px;
    /* font-weight: 500; */
  }
  h4{
    font-size: 18px;
  }
  p{
    font-size: 16px;
  }
  h2 span,h3 span,h4 span{
    font-weight: 600;
  }
`

const StyledDrawer = styled(Drawer)`
  .drawer-title{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  
  .ant-drawer-body{
    scrollbar-width: thin;
  }
`

const StyleButton = styled(Button)`
  padding: 0px 10px;
  border-radius: 7px;
  background-color: #5943af;
`
// style={{ height: '20px', padding: '0px', marginLeft: '10px' }}