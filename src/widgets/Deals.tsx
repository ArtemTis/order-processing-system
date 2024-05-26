import { Button, Drawer, Input, Select, message } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { dealsApi } from '../entities/chats/dealsApi';
import moment from 'moment';
import { StyledButton } from '../pages/Settings';
import TextArea from 'antd/es/input/TextArea';
import { StyledModal } from './AddPatterns';
import { useSelector } from 'react-redux';
import { selectAllChats } from '../entities/chats/selectors';

interface IProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  chatId?: string
}

const Deals: React.FC<IProps> = ({ open, setOpen, chatId }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [titleDeal, setTitleDeal] = useState<string>('');
  const [amountDeal, setAmountDeal] = useState<number>();
  const [selectedStatus, setSelectedStatus] = useState<string>();

  const { data: deals, isLoading: isLoadingDeals, isError: isErrorDeals } = dealsApi.useGetDealsByChatQuery(+(chatId ?? -1));

  const { data: resStatus, isLoading: isLoadingStatus, isError: isErrorStatus } = dealsApi.useGetAllStatusesOfDealQuery();

  const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

  const [addDeal, { isLoading, isError }] = dealsApi.useAddDealMutation();
  const onClose = () => {
    setOpen(false);
  };

  const addPatternModal = () => {
    setIsModalOpen(true);
  }
  const [messageApi, contextHolder] = message.useMessage();

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

  const handleCancel = () => {
    setIsModalOpen(false);
    setTitleDeal('');
    setAmountDeal(undefined);
    setSelectedStatus('');
  };

  const handleChange = (value: string) => {
    setSelectedStatus(value);
  };


  return (
    <StyledDrawer onClose={onClose} open={open} closeIcon={null}>
      <StyledButton type='primary' onClick={addPatternModal}>Добавить сделку</StyledButton>
      <h2 className='drawer-title'>Список сделок:</h2>
      {
        deals?.data.map(deal => {
          const date = moment(deal.status_of_deal_id.created_at).format("hh:mm / D.MM")
          return (
            <StyledDeal key={deal.id}>

              <h2> <span>Название: </span>{deal.desc}</h2>
              <h3> <span>Стоимость: </span> {deal.amount / 100}</h3>
              <h4> <span>Статус: </span> {deal.status_of_deal_id.name}</h4>
              <p>{deal.status_of_deal_id.desc}</p>
              <p>{date}</p>
            </StyledDeal>
          )
        })
      }

      <StyledModal title="Добавить сделку" open={isModalOpen} onOk={handleOk}
        okText={'Сохранить'} cancelText={'Закрыть'} onCancel={handleCancel}>
        <p>Введите текст новой сделки</p>

        <h3>Название сделки</h3>
        <StyledInput placeholder='Название' value={titleDeal} onChange={e => setTitleDeal(e.target.value)} />
        <h3>Стоимость сделки</h3>
        <StyledInput placeholder='Стоимость' type='number' value={amountDeal} onChange={e => setAmountDeal(+e.target.value)} />

        <h3>Статус сделки</h3>
        <Select
          defaultValue='1'
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
    </StyledDrawer>
  )
}

export default Deals

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
    margin: 10px 0;
  }
  
  .ant-drawer-body{
    scrollbar-width: thin;
  }
`

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`