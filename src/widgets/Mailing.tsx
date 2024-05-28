import React, { useState } from 'react'
import { messagesApi } from '../entities/chats/messagesApi';
import { StyledButton } from '../pages/Settings';
import { StyledModal } from './AddPatterns';
import { IChatSnippet } from '../entities/types';
import { Select, message } from 'antd';

interface IProps {
    chats: IChatSnippet[]
}

const Mailing: React.FC<IProps> = ({ chats }) => {

    const [sendMailing, { data, isLoading: sendLoading, isError: sendError }] = messagesApi.useSendMailingMutation();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [messageApi, contextHolder] = message.useMessage();
    const [mailingText, setMailingText] = useState<string>();


    const handleOk = () => {
        try {
            if (mailingText) {
                setIsModalOpen(false);
                sendMailing({
                    chats_id: [],
                    text: ''
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы добавили новую сделку',
                });
                setMailingText('');
            } else {
                messageApi.open({
                    type: 'warning',
                    content: 'Введите нужную информацию!',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMailingText('');
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const handleChangeSelect = (value: string[]) => {
        console.log(`selected ${value}`);
      };

    return (
        <div>
            <StyledButton type='primary' onClick={openModal}>Рассылка</StyledButton>

            <StyledModal title="Добавить сделку" open={isModalOpen} onOk={handleOk}
                okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
                <p>Введите текст новой сделки</p>


                <h3>Статус сделки</h3>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChangeSelect}
                    options={
                        chats.map(chat => {
                            return {
                                label: chat.name,
                                value: chat.id
                            }
                        })
                    }
                />
            </StyledModal>
        </div>
    )
}

export default Mailing