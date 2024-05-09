import React from 'react'
import './chat.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { companyApi } from '../entities/company/companyApi'
import { useParams } from 'react-router-dom'

enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

const Chat = () => {

  const { chatId } = useParams();

  console.log(chatId);

  const { data: responseMessages } = companyApi.useChatsMessagesQuery(+(chatId ?? -1));

  console.log(responseMessages);


  return (
    <div className="container">

      <div className="msg-header">
        <div className="container1">
          {/* <img src="user1.png" className="msgimg" /> */}
          <Avatar size={26} icon={<UserOutlined />} />
          <div className="active">
            <p>User name</p>
          </div>
        </div>
      </div>

      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">

            <div className="msg-page">

              {
                responseMessages?.data.map((message, i) => {
                  const itsMe = message.from_user_id.name.trim().toLowerCase() === Role.ADMIN;

                  const date = message.created_at.split('T');
                  const time = date[1].split(':').splice(0, 2).join(':');
                  const dateDay = date[0].split('-').reverse().splice(0, 1).join('.');
                  const dateMounth = date[0].split('-').reverse().splice(1, 1).join('.');

                  const months = [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'октябрь',
                    'Ноябрь',
                    'Декабрь',
                  ];

                  return itsMe ? (
                    <div className="outgoing-chats">
                      <div className="outgoing-chats-img">
                        <img src="user1.png" />
                      </div>
                      <div className="outgoing-msg">
                        <div className="outgoing-chats-msg">
                          <p className="multi-msg">
                            {message.text}
                          </p>
                          <span className="time">{time} | {`${months[+dateMounth-1]} | ${dateDay}`}</span>
                        </div>
                      </div>
                    </div>
                  )
                    : (
                      <div className="received-chats">
                        <div className="received-chats-img">
                          <img src="user2.png" />
                        </div>
                        <div className="received-msg">
                          <div className="received-msg-inbox">
                            <p>
                              {message.text}
                            </p>
                            <span className="time">{time} | {`${months[+dateMounth]} | ${dateDay}`}</span>
                          </div>
                        </div>
                      </div>
                    )
                })}

              <div className="received-chats">
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

              <div className="received-chats">
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
              </div>
              <div className="received-chats">
                <div className="received-chats-img">
                  <img src="user2.png" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p className="single-msg">
                      Hi !! This is message from John Lewis. Lorem ipsum, dolor
                      sit amet consectetur adipisicing elit. iste distinctio
                      expedita illo!
                    </p>
                    <span className="time">18:31 PM | July 24</span>
                  </div>
                </div>
              </div>
              <div className="outgoing-chats">
                <div className="outgoing-chats-img">
                  <img src="user1.png" />
                </div>
                <div className="outgoing-msg">
                  <div className="outgoing-chats-msg">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Velit, sequi.
                    </p>

                    <span className="time">18:34 PM | July 24</span>
                  </div>
                </div>
              </div>

              <div className="outgoing-chats">
                <div className="outgoing-chats-img">
                  <img src="user1.png" />
                </div>
                <div className="outgoing-msg">
                  <div className="outgoing-chats-msg">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Velit, sequi.
                    </p>

                    <span className="time">18:34 PM | July 24</span>
                  </div>
                </div>
              </div>

              <div className="received-chats">
                <div className="received-chats-img">
                  <img src="user2.png" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p className="single-msg">
                      Hi !! This is message from John Lewis. Lorem ipsum, dolor
                      sit amet consectetur adipisicing elit. iste distinctio
                      expedita illo!
                    </p>
                    <span className="time">18:31 PM | July 24</span>
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
              </div>
            </div>
          </div>


          <div className="msg-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write message..."
              />

              <span className="input-group-text send-icon">
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