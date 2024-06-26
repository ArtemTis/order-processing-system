import { Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledWrapper } from './Settings'
import { companyApi } from '../entities/chats/companyApi';
import { messagesApi } from '../entities/chats/messagesApi';
import { statsApi } from '../entities/chats/statsApi';
import { IGetAmountMess } from '../entities/types';
import moment from 'moment';
import Chart from '../widgets/Chart';
import styled from 'styled-components';

const Statistics = () => {

    const [messLength, setMessLength] = useState(0);

    const { data: chatsResponse, isLoading: chatsLoad, isError: chatsError } = companyApi.useChatsByCompanyQuery(11);

    // const { data: chatMessages, isLoading: messLoad, isError: messError } = messagesApi.useChatsMessagesQuery(11);
    // let chatsCount = chatMessages?.data.length;

    // setMessLength(prev => prev + (chatsCount ?? 0))

    const formatTime = moment().format("DD/MM/YYYY");

    const dates: IGetAmountMess = {
        date_from: `${moment().subtract(7, 'days').format("DD/MM/YYYY")}`,
        date_to: `${moment().format("DD/MM/YYYY")}`
    }

    const [sendAmount, { data: amountData, isLoading: amountLoad, isError: amountError }] = statsApi.useAmountMessMutation();
    const [sendDeals, { data: dealsData, isLoading: dealsLoad, isError: dealsError }] = statsApi.useDealsByDatesMutation();

    useEffect(() => {
        sendAmount(dates)
        sendDeals(dates)
    }, [])

    return (
        <StyledWrapper>
            <h1>Статистика</h1>
            <StatWrap>
                <Statistic title="Активные чаты" value={chatsResponse?.data.length} />
                <Statistic title="Колличество сообщений за неделю" value={amountData} />
                <Statistic title="Колличество сделок за неделю" value={dealsData} />
            </StatWrap>


            <Chart />
        </StyledWrapper>
    )
}

export default Statistics

const StatWrap = styled.div`
    display: flex;
    justify-content: space-around;
`