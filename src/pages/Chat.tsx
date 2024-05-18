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


  const [text, setText] = useState('');

  const onChange: CascaderProps<Option>['onChange'] = (_, selectedOptions) => {
    setText(selectedOptions[1]?.label);

    setInputValue(selectedOptions[1]?.label)

    // if (inputRef.current) {
    //   console.log(text);
    //   inputRef.current.value = `aaaaaaaa`;

    // }

    //@ts-ignore
    // inputRef.current = text;
    // setText(selectedOptions.map((o) => o.label).join(', '));
  };

  // useEffect(() => {
  //   scroll.current?.scrollIntoView();
  // },[])


  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  const { newMessages, setNewMessages, loading, error } = useChat(chatId ?? '');


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">

      <div className="msg-header">
        <div className="container1">
          {/* <img src="user1.png" className="msgimg" /> */}
          <Avatar size={26} icon={<img src={chatById?.client_contact.photo_url ?? ''} alt="User avatar" />} />

          <div className="active">
            <p>User name</p>
          </div>

          <StyledButton style={{height: '20px', padding: '0px', marginLeft: '10px'}} onClick={showDrawer}>Сделка</StyledButton>
        </div>
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
              <a>Паттерн ответа</a>
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
              </span>
            </div>
          </div>
        </div>
      </div>

      <Drawer title="Список сделок" onClose={onClose} open={open} closeIcon={null}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default Chat