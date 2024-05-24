import React, { useState } from 'react'
import { StyledButton } from '../pages/Settings';
import styled from 'styled-components';
import { companyApi } from '../entities/chats/companyApi';
import { StyledModal } from './AddPatterns';
import { Input, message } from 'antd';
import { IStatusAdd } from '../entities/types';
import { dealsApi } from '../entities/chats/dealsApi';

enum STATUS_COLOR {
    '#d61a09cc',
    '#ff7b00cc',
    '#07b11dcc',
}

const Statuses = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>('');
    const [inputDesc, setInputDesc] = useState<string>('');

    const [statusValues, setStatuseValue] = useState<IStatusAdd>();

    const { data: resStatus, isLoading: isLoadingStatus, isError: isErrorStatus } = dealsApi.useGetAllStatusesOfDealQuery();
    const [addStatus, { isLoading: addStatusLoad, isError: addStatusErr }] = dealsApi.useAddStatusesOfDealMutation();
    const [messageApi, contextHolder] = message.useMessage();

    const addStatusModal = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        try {
            if (inputName && inputDesc) {
                setIsModalOpen(false);
                addStatus({
                    name: inputName,
                    desc: inputDesc
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы добпавили новый статус',
                });
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
    };

    return (
        <>
            {
                isLoadingStatus &&
                <p>Загрузка...</p>
            }
            {contextHolder}
            {
                resStatus &&
                resStatus?.data.map(item => (
                    <StyledStatus key={item.id} colordot={STATUS_COLOR[item.id - 1]}>
                        <h2>{item.name}</h2>
                        <h3>{item.desc}</h3>
                    </StyledStatus>
                ))
            }
            <StyledButton type='primary' onClick={addStatusModal}>Добавить статус</StyledButton>

            <StyledModal title="Добавить шаблон" open={isModalOpen} onOk={handleOk}
                okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
                <p>Введите название и описание нового статуса</p>
                <div>
                    Название:
                    <Input value={inputName} onChange={e => setInputName(e.target.value)} />
                </div>
                <div>
                    Описание:
                    <Input value={inputName} onChange={e => setInputName(e.target.value)} />
                </div>
            </StyledModal>
        </>
    )
}

export default Statuses

const StyledStatus = styled.div<{ colordot?: string }>`
  margin-bottom: 10px;
  
  h2{
    font-size: 18px;
    font-weight: 500;

    &::before {
     content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      -moz-border-radius: 7.5px;
      -webkit-border-radius: 7.5px;
      border-radius: 7.5px;
      background-color: ${props => props.colordot ? props.colordot : '#808094'};
      margin-right: 13px;
    }
  }
  h3{
    font-size: 16px;
    margin-left: 25px;
  }
`