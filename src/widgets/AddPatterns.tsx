import React, { MouseEvent, useEffect, useState } from 'react'
import { companyApi } from '../entities/chats/companyApi';
import { StyledButton, StyledTabs } from '../pages/Settings';
import styled from 'styled-components';
import { Input, Modal, Popconfirm, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CloseOutlined } from '@ant-design/icons';
import { IPattern, IPatternMessage, IPatterns, ITypePattern } from '../entities/types';

interface ITab {
    key: string;
    label: JSX.Element | string;
    closable?: boolean;
    disabled?: boolean;
    children?: JSX.Element;
    closeIcon?: JSX.Element;
}


const AddPatterns = () => {

    const [areaValue, setAreaValue] = useState('');
    const [typePattern, setTypePattern] = useState('');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isTypeModalOpen, setIsTypeModalOpen] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<number>();

    const { data: res, isLoading: isLoad, isError: isErr } = companyApi.useGetPatternsByTypeQuery();
    const [sendNewPattern, { isLoading: isLoade, isError: isErro }] = companyApi.useAddPatternMutation();
    const [sendNewTypePattern, { data, isLoading: isLoadType, isError: isErrorType }] = companyApi.useAddTypePatternMutation();
    const [messageApi, contextHolder] = message.useMessage();

    const [delTypePattern, { data: dataTypePattern, isLoading: isLoadTypePattern, isError: isErrorTypePattern }] = companyApi.useDeleteTypePatternMutation();
    const [delPattern, { data : dataPattern, isLoading: isLoadPattern, isError: isErrorPattern }] = companyApi.useDeletePatternMutation();

    const addTypePatternModal = () => {
        setIsTypeModalOpen(true);
    }

    useEffect(() => {
        document.querySelector('[data-node-key="999"]')?.addEventListener('click', addTypePatternModal);
        return () => {
            document.querySelector('[data-node-key="999"]')?.removeEventListener('click', addTypePatternModal);
        }
    }, [])

    const handleTypeOk = () => {
        try {
            if (typePattern) {
                setIsTypeModalOpen(false);
                sendNewTypePattern({
                    name: typePattern
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы добавили новый тип шаблонов',
                });
                setTypePattern('')
            } else {
                messageApi.open({
                    type: 'warning',
                    content: 'Введите нужную информацию!',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addPatternModal = (id: number) => {
        setIsModalOpen(true);
        setActiveId(id)
    }

    const handleOk = () => {
        try {
            if (areaValue) {
                setIsModalOpen(false);
                sendNewPattern({
                    text: areaValue,
                    type_of_message_pattern_id: activeId ?? -1
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы добавили новый шаблон',
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
        setIsTypeModalOpen(false);
        setAreaValue('');
        setTypePattern('');
    };

    const deleteTypePattern = async (patternType: ITypePattern) => {
        try {
            if (patternType) {
                delTypePattern(patternType.id).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы удалили тип шаблона',
                });
            } else {
                messageApi.open({
                    type: 'warning',
                    content: 'Неверная информация о шаблоне!',
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    const deletePattern = async (pattern: IPatternMessage) => {
        try {
            if (pattern) {
                delPattern(pattern.id).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы удалили шаблон',
                });
            } else {
                messageApi.open({
                    type: 'warning',
                    content: 'Неверная информация о шаблоне!',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const tabs =
        //  React.useMemo<ITab[]>(() =>
        [
            ...(res?.data ?? []).map((pattern, i) => {
                const id = String(i + 1);
                return {
                    key: `${pattern.id}`,
                    // label: pattern.name,
                    label: <StyledLabel> {pattern.name}
                        <Popconfirm title="Удалить тип шаблона?" onConfirm={() => deleteTypePattern(pattern)}>
                            <CloseOutlined />
                        </Popconfirm>
                    </StyledLabel>,
                    children: (<>
                        {
                            pattern.messagePatterns.map(mess => (
                                <StyledDiv key={mess.id}>
                                    <h6 className='pattern-text'>{mess.text}</h6>

                                    <Popconfirm title="Удалить шаблон?" onConfirm={() => deletePattern(mess)}>
                                        <CloseOutlined />
                                    </Popconfirm>
                                </StyledDiv>
                            ))
                        }
                        <StyledButton type='primary' onClick={() => addPatternModal(pattern.id)}>Добавить шаблон</StyledButton>
                    </>)
                };
            }),
            {
                key: '999',
                //@ts-ignore
                label: 'Добавить',
                closable: false,
                disabled: true,
            }
        ]
    // , [res?.data, data])


    return (
        <>
            {contextHolder}
            {
                isLoad &&
                <p>Загрузка...</p>
            }
            <StyledTabs
                tabPosition={"left"}
                defaultActiveKey='1'
                items={tabs}
                style={{ maxHeight: '70vh' }}
            />

            <StyledModal title="Добавить шаблон" open={isModalOpen} onOk={handleOk}
                okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
                <p>Введите текст нового шаблона</p>
                <TextArea
                    value={areaValue}
                    onChange={(e) => setAreaValue(e.target.value)}
                    placeholder="Текст шаблона"
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
            </StyledModal>


            <StyledModal title="Добавить тип шаблонов" open={isTypeModalOpen} onOk={handleTypeOk}
                okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
                <p>Введите текст новго типа шаблонов</p>
                <Input value={typePattern} onChange={e => setTypePattern(e.target.value)} />
            </StyledModal>
        </>
    )
}

export default AddPatterns

export const StyledModal = styled(Modal)`
    .ant-modal-content{
      border-radius: 7px;

      textarea{
        border-radius: 7px;
      }
      button{
        border-radius: 7px;
      }
    }

  .ant-input-outlined{
    background: white;
  }

  textarea:hover{
    border-width: 1px;
    border-style: solid;
    border-color: #d9d9d9;
  }

  p{
    font-size: 16px;
    margin-bottom: 10px;
  }
`

const StyledLabel = styled.label`
    display: flex;
    gap: 10px;
`

const StyledDiv = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`
