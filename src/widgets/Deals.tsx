import { Button, Drawer, Input, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dealsApi } from '../entities/chats/dealsApi';
import moment from 'moment';
import { StyledButton } from '../pages/Settings';
import TextArea from 'antd/es/input/TextArea';
import { StyledModal } from './AddPatterns';
import { useSelector } from 'react-redux';
import { selectAllChats } from '../entities/chats/selectors';
import edit from '../shared/assets/edit.svg'
import { IDeal, IDealSend } from '../entities/types';
import DealModal from '../shared/ui/DealModal';

interface IProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  chatId?: string
}

const Deals: React.FC<IProps> = ({ open, setOpen, chatId }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const [titleDeal, setTitleDeal] = useState<string>('');
  // const [amountDeal, setAmountDeal] = useState<number>();
  // const [selectedStatus, setSelectedStatus] = useState<string>();
  const [editableDeal, setEditableDeal] = useState<IDeal>();

  const { data: deals, isLoading: isLoadingDeals, isError: isErrorDeals } = dealsApi.useGetDealsByChatQuery(+(chatId ?? -1));

  const { data: resStatus, isLoading: isLoadingStatus, isError: isErrorStatus } = dealsApi.useGetAllStatusesOfDealQuery();


  const [deleteDeal] = dealsApi.useDeleteDealMutation();

  // const chatById = useSelector(selectAllChats)?.find(chat => chat.id === +(chatId ?? -1));

  // const [addDeal, { isLoading, isError }] = dealsApi.useAddDealMutation();
  const onClose = () => {
    setOpen(false);
  };

  const addDealModal = () => {
    setIsModalOpen(true);
  }
  // const [messageApi, contextHolder] = message.useMessage();

  // const handleOk = () => {
  //   try {
  //     if (titleDeal && amountDeal && selectedStatus) {
  //       setIsModalOpen(false);
  //       addDeal({
  //         desc: titleDeal,
  //         amount: amountDeal * 100 ?? 0,
  //         status_of_deal_id: +(selectedStatus ?? -1),
  //         contact_id: chatById?.client_contact.id ?? -1
  //       }).unwrap();
  //       messageApi.open({
  //         type: 'success',
  //         content: 'Вы добавили новую сделку',
  //       });
  //       setTitleDeal('');
  //       setAmountDeal(undefined);
  //       setSelectedStatus('');
  //     } else {
  //       messageApi.open({
  //         type: 'warning',
  //         content: 'Введите нужную информацию!',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleUpdate = () => {
  //   try {
  //     if (titleDeal && amountDeal && selectedStatus) {
  //       console.log(editableDeal);
  //       setIsModalOpen(false);
  //       updateDeal({
  //         dealId: editableDeal?.id ?? -1,
  //         body: {
  //           desc: titleDeal,
  //           amount: amountDeal * 100 ?? 0,
  //           status_of_deal_id: +(selectedStatus ?? -1)
  //         }
  //       }).unwrap();
  //       messageApi.open({
  //         type: 'success',
  //         content: 'Вы изменили сделку',
  //       });
  //       setTitleDeal('');
  //       setAmountDeal(undefined);
  //       setSelectedStatus('');
  //       setEditableDeal(undefined);
  //     } else {
  //       messageApi.open({
  //         type: 'warning',
  //         content: 'Введите нужную информацию!',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const updateDealModal = (deal: IDeal) => {
    setIsModalOpen(true);
    setEditableDeal(deal);

    // setTitleDeal(deal.desc);
    // setAmountDeal(deal.amount / 100);
    // setSelectedStatus(`${deal.status_of_deal_id.id}`)
  }

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  //   setTitleDeal('');
  //   setAmountDeal(undefined);
  //   setSelectedStatus('');
  //   setEditableDeal(undefined);
  // };

  // const handleChange = (value: string) => {
  //   setSelectedStatus(value);
  // };

  const [dealsList, setDealsList] = useState<IDeal[]>();

  const handleChangeFilter = (value: string) => {

    if (value === 'all') {
      setDealsList(deals?.data);
    } else {
      setDealsList(deals?.data.filter(item => `${item.status_of_deal_id.id}` === `${value}`))
    }

  };

  const statusFilter = [{ value: 'all', label: 'Все статусы' },
  ...(resStatus?.data ?? []).map(status => {
    return { value: status.id, label: status.name }
  })]


  useEffect(() => {
    setDealsList(deals?.data)
  }, [deals?.data])

  return (
    <StyledDrawer onClose={onClose} open={open} closeIcon={null}>
      <StyledButton type='primary' onClick={addDealModal}>Добавить сделку</StyledButton>
      <div className='header-wrapper'>
        <h2 className='drawer-title'>Список сделок:</h2>
        <Select
          defaultValue='all'
          style={{ width: 150 }}
          onChange={handleChangeFilter}
          placeholder='Статус'
          options={
            statusFilter
          }
        />
      </div>
      {
        deals?.data && deals?.data.length > 0 ?
          // deals?.data.filter(item => `${item.status_of_deal_id.id}` === selectedfilterStatus).map(deal => {
          dealsList?.map(deal => {
            const date = moment(deal.status_of_deal_id.created_at).format("hh:mm / D.MM")
            return (
              <StyledDeal key={deal.id}>
                <h2>
                  <span>Название: </span>{deal.desc}
                  <img src={edit} alt="edit" onClick={() => updateDealModal(deal)} />
                </h2>
                <h3> <span>Стоимость: </span> {deal.amount / 100} руб </h3>
                <h4> <span>Статус: </span> {deal.status_of_deal_id.name}
                </h4>
                <p>{deal.status_of_deal_id.desc}</p>
                <p>{date}</p>
              </StyledDeal>
            )
          })
          : <p>Сделок пока нет</p>
      }
      {/* 
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
      </StyledModal> */}

      <DealModal
        chatId={chatId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editableDeal={editableDeal}
        setEditableDeal={setEditableDeal}
      />

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

  .ant-select-selector{
    border-radius: 7px;
  }

  img{
    cursor: pointer;
    width: 20px;
    /* margin-left: 10px; */
  }
  h2{
    font-size: 20px;
    margin-right: 20px;
    position: relative;

    img{
      position: absolute;
      top: 2px;
      right: -18px;
    }
  }
  h3{
    font-size: 20px;
    /* font-weight: 500; */
    display: flex;
    align-items: center;
    span{
      margin-right: 5px;
    }
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

  .header-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
  }
`

