import { Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledWrapper } from './Settings'
import { companyApi } from '../entities/chats/companyApi';
import { messagesApi } from '../entities/chats/messagesApi';

const Statistics = () => {

    const [messLength, setMessLength] = useState(0);

    const { data: chatsResponse, isLoading: chatsLoad, isError: chatsError } = companyApi.useChatsByCompanyQuery(11);

    const { data: chatMessages, isLoading: messLoad, isError: messError } = messagesApi.useChatsMessagesQuery(11);
    let chatsCount = chatMessages?.data.length;

    // setMessLength(prev => prev + (chatsCount ?? 0))

    return (
        <StyledWrapper>
            <h1>Статистика</h1>

            <Statistic title="Активные чаты" value={chatsResponse?.data.length} />
            <Statistic title="Сообщений за последние сутки" value={chatsCount} />
        </StyledWrapper>
    )
}

export default Statistics