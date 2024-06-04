import moment from "moment";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IGetAmountMess } from "../entities/types";
import { statsApi } from "../entities/chats/statsApi";
import { useEffect } from "react";
import styled from "styled-components";


const Chart = () => {

    const dates: IGetAmountMess = {
        date_from: `${moment().subtract(7, 'days').format("DD/MM/YYYY")}`,
        date_to: `${moment().format("DD/MM/YYYY")}`
    }

    const [getMessages, { data: messChartData, isLoading: messChartLoad, isError: messChartError }] = statsApi.useMessagesChartMutation();
    const [getDeals, { data: dealsChartData, isLoading: dealsChartLoad, isError: dealsChartError }] = statsApi.useDealsChartMutation();
    const [getStats, { data: messAndDeals, isLoading: messAndDealsLoading }] = statsApi.useDealsAndMessagesChartMutation();

    useEffect(() => {
        getMessages(dates)
        getDeals(dates)
        getStats(dates)
    }, [])


    return (
        <StyledWrap>
            <h2>Динамика сообщений и заявок за неделю</h2>
            <LineChart
                width={800}
                height={400}
                data={messAndDeals}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="name" /> */}
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" name="Заявки" dataKey="deals" stroke="#4239f3"
                // strokeDasharray="5 5" 
                />
                <Line type="monotone" name="Сообщения" dataKey="messages" stroke="#0dcc56"
                // strokeDasharray="3 4 5 2"
                />
            </LineChart>
        </StyledWrap>


    );
};
export default Chart;

const StyledWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2{
        font-size: 20px;
        margin: 20px;
    }
`