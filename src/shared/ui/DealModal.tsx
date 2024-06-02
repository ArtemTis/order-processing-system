import React, { useEffect, useState } from 'react'
import { StyledModal } from '../../widgets/AddPatterns'
import styled from 'styled-components'
import { Input, Select, message } from 'antd'
import { IDeal } from '../../entities/types'
import { dealsApi } from '../../entities/chats/dealsApi'
import { useSelector } from 'react-redux'
import { selectAllChats } from '../../entities/chats/selectors'

interface IProps {
    chatId?: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    editableDeal?: IDeal;
    setEditableDeal: React.Dispatch<React.SetStateAction<IDeal | undefined>>
}

const DealModal: React.FC<IProps> = ({ chatId, isModalOpen, setIsModalOpen, editableDeal, setEditableDeal }) => {

    const [messageApi, contextHolder] = message.useMessage();

    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [titleDeal, setTitleDeal] = useState<string>('');
    const [amountDeal, setAmountDeal] = useState<number>();
    const [selectedStatus, setSelectedStatus] = useState<string>();
    // const [editableDeal, setEditableDeal] = useState<IDeal>();

    const [updateDeal] = dealsApi.useUpdateDealMutation();

    const { data: resStatus, isLoading: isLoadingStatus, isError: isErrorStatus } = dealsApi.useGetAllStatusesOfDealQuery();

    const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

    const [addDeal, { isLoading, isError }] = dealsApi.useAddDealMutation();

    const handleChange = (value: string) => {
        setSelectedStatus(value);
    };

    useEffect(() => {
        if (editableDeal) {

            setTitleDeal(editableDeal?.desc ?? '');
            setAmountDeal((editableDeal?.amount ?? 0) / 100 ?? 0);
            setSelectedStatus(`${editableDeal?.status_of_deal_id.id ?? 0}`)
        }
    }, [editableDeal])

    const handleCancel = () => {
        setIsModalOpen(false);
        setTitleDeal('');
        setAmountDeal(undefined);
        setSelectedStatus('');
        setEditableDeal(undefined);
    };

    const handleOk = () => {
        try {
            if (titleDeal && amountDeal && selectedStatus) {
                setIsModalOpen(false);
                addDeal({
                    desc: titleDeal,
                    amount: amountDeal * 100 ?? 0,
                    status_of_deal_id: +(selectedStatus ?? -1),
                    contact_id: chatById?.client_contact.id ?? -1
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы добавили новую сделку',
                });
                setTitleDeal('');
                setAmountDeal(undefined);
                setSelectedStatus('');
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


    const handleUpdate = () => {
        try {
            if (titleDeal && amountDeal && selectedStatus) {
                console.log(editableDeal);
                setIsModalOpen(false);
                updateDeal({
                    dealId: editableDeal?.id ?? -1,
                    body: {
                        desc: titleDeal,
                        amount: amountDeal * 100 ?? 0,
                        status_of_deal_id: +(selectedStatus ?? -1)
                    }
                }).unwrap();
                messageApi.open({
                    type: 'success',
                    content: 'Вы изменили сделку',
                });
                setTitleDeal('');
                setAmountDeal(undefined);
                setSelectedStatus('');
                setEditableDeal(undefined);
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

    return (
        <>
            <StyledModal title="Добавить сделку" open={isModalOpen} onOk={editableDeal ? handleUpdate : handleOk}
                okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
                <p>Введите текст сделки</p>

                <h3>Название сделки</h3>
                <StyledInput placeholder='Название' value={titleDeal} onChange={e => setTitleDeal(e.target.value)} />
                <h3>Стоимость сделки</h3>
                <StyledInput placeholder='Стоимость' type='number' value={amountDeal} onChange={e => setAmountDeal(+e.target.value)} />

                <h3>Статус сделки</h3>
                <Select
                    defaultValue={resStatus?.data[editableDeal?.status_of_deal_id.id ?? 0].name}
                    style={{ width: 220 }}
                    onChange={handleChange}
                    placeholder='Статус'
                    options={
                        resStatus?.data.map(status => {
                            return { value: status.id, label: status.name }
                        })
                    }
                />
            </StyledModal>
            {contextHolder}
        </>
    )
}

export default DealModal

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`