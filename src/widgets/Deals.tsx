import { Button, Drawer } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { dealsApi } from '../entities/chats/dealsApi';
import moment from 'moment';

interface IProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    chatId?: string
}

const Deals:React.FC<IProps> = ({open, setOpen, chatId}) => {

    
  const { data: deals, isLoading: isLoadingDeals, isError: isErrorDeals } = dealsApi.useGetDealsByChatQuery(+(chatId ?? -1));

  const onClose = () => {
    setOpen(false);
  };


  return (
    <StyledDrawer onClose={onClose} open={open} closeIcon={null}>
        <Button type='primary'>Добавить сделку</Button>
        <h2 className='drawer-title'>Список сделок:</h2>
        {
          deals?.data.map(deal => {
            const date = moment(deal.status_of_deal_id.created_at).format("hh:mm / D.MM")
            return (
              <StyledDeal key={deal.id}>

                <h2> <span>Название: </span>{deal.desc}</h2>
                <h3> <span>Стоимость: </span> {deal.amount}</h3>
                <h4> <span>Статус: </span> {deal.status_of_deal_id.name}</h4>
                <p>{deal.status_of_deal_id.desc}</p>
                <p>{date}</p>
              </StyledDeal>
            )
          })
        }
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
  }
  
  .ant-drawer-body{
    scrollbar-width: thin;
  }
`