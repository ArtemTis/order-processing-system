import { Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledWrapper } from './Settings'
import { companyApi } from '../entities/chats/companyApi';
import { messagesApi } from '../entities/chats/messagesApi';
import { statsApi } from '../entities/chats/statsApi';
import { IGetAmountMess } from '../entities/types';
import moment from 'moment';

const Statistics = () => {

    const [messLength, setMessLength] = useState(0);

    const { data: chatsResponse, isLoading: chatsLoad, isError: chatsError } = companyApi.useChatsByCompanyQuery(11);

    // const { data: chatMessages, isLoading: messLoad, isError: messError } = messagesApi.useChatsMessagesQuery(11);
    // let chatsCount = chatMessages?.data.length;

    // setMessLength(prev => prev + (chatsCount ?? 0))

    const formatTime = moment().format("DD/MM/YYYY");

    // const dates: IGetAmountMess = {
    //     date_from: `${moment().subtract(7, 'days').format("DD/MM/YYYY")}`,
    //     date_to:  `${moment().format("DD/MM/YYYY")}`
    // }
    const dates: IGetAmountMess = {
        date_from: "25/05/2024",
        date_to: "29/05/2024"
    }
    console.log(dates);


    const { data: amountData, isLoading: amountLoad, isError: amountError } = statsApi.useAmountMessQuery(dates, {refetchOnMountOrArgChange: true});
    const { data: dealsData, isLoading: dealsLoad, isError: dealsError } = statsApi.useDealsByDatesQuery(dates);

    console.log(amountData);
    console.log(dealsData);


    return (
        <StyledWrapper>
            <h1>Статистика</h1>

            <Statistic title="Активные чаты" value={chatsResponse?.data.length} />
            <Statistic title="Колличество сообщений за неделю" value={amountData} />
            <Statistic title="Колличество сделок за неделю" value={dealsData} />
        </StyledWrapper>
    )
}

export default Statistics