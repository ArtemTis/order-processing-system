import { Statistic } from 'antd'
import React from 'react'
import { StyledWrapper } from './Settings'

const Statistics = () => {
    return (
        <StyledWrapper>
            <h1>Статистика</h1>

            <Statistic title="Active Users" value={112893} />
        </StyledWrapper>
    )
}

export default Statistics