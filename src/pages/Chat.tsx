import React, { useCallback, useEffect, useRef, useState } from 'react'
import './chat.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Cascader, CascaderProps, Popover } from 'antd'
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
    </div>
  )
}

export default Chat