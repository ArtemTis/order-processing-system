import React, { useState } from 'react'
import { messagesApi } from '../entities/chats/messagesApi';
import { StyledButton } from '../pages/Settings';
import { StyledModal } from './AddPatterns';
import { IChatSnippet } from '../entities/types';
import { Avatar, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UserOutlined } from '@ant-design/icons';

interface IProps {
    chats: IChatSnippet[]
}

const Mailing: React.FC<IProps> = ({ chats }) => {

    const [sendMailing, { data, isLoading: sendLoading, isError: sendError }] = messagesApi.useSendMailingMutation();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [mailingText, setMailingText] = useState<string>();
    const [clientsId, setClientsId] = useState<number[]>([]);

    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        try {
            if (clientsId && mailingText && clientsId?.length > 0) {
                setIsModalOpen(false);
                sendMailing({
                    chats_id: clientsId,
                    text: mailingText
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы отправили рассылку',
                });
                setMailingText('');
                setClientsId([]);
            } else {
                messageApi.open({
                    type: 'warning',
                    content: 'Введите нужную информацию!',
                });
            }
        } catch (error) {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Ошибка отправки!',
            });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMailingText('');
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const handleChangeSelect = (value: number[]) => {
        setClientsId(value)
    };

    return (
        <>
            <StyledButton type='primary' onClick={openModal}>Рассылка</StyledButton>

            <StyledModal title="Отправить рассылку" open={isModalOpen} onOk={handleOk}
                okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>

                <h3>Список получателей</h3>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выберете клиентов"
                    onChange={handleChangeSelect}
                    options={
                        chats.map(chat => {
                            return {
                                label: <>
                                    <Avatar
                                        size={20}
                                        icon={
                                            chat.client_contact.photo_url
                                                ? <img src={chat.client_contact.photo_url} alt="User avatar" />
                                                : <UserOutlined />}
                                        style={{ marginRight: '7px' }}
                                    />
                                    {chat.name}
                                </>,
                                value: chat.id
                            }
                        })
                    }
                />
                <p>Введите текст рассылки</p>

                <TextArea
                    value={mailingText}
                    onChange={(e) => setMailingText(e.target.value)}
                    placeholder="Текст рассылки"
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
            </StyledModal>
            {contextHolder}
        </>
    )
}

export default Mailing