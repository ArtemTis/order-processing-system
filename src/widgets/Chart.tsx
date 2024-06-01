import moment from "moment";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IGetAmountMess } from "../entities/types";
import { statsApi } from "../entities/chats/statsApi";
import { useEffect } from "react";
import styled from "styled-components";

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May'];

export const dataL = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [225, 167, 473, 987],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [212, 654, 723, 87, 11],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const Chart = () => {

    const dates: IGetAmountMess = {
        date_from: `${moment().subtract(7, 'days').format("DD/MM/YYYY")}`,
        date_to: `${moment().format("DD/MM/YYYY")}`
    }

    const [getMessages, { data: messChartData, isLoading: messChartLoad, isError: messChartError }] = statsApi.useMessagesChartMutation();
    const [getDeals, { data: dealsChartData, isLoading: dealsChartLoad, isError: dealsChartError }] = statsApi.useDealsChartMutation();

    useEffect(() => {
        getMessages(dates)
        getDeals(dates)
    }, [])

    const arr3 = messChartData?.map((item, i) => {

        const deakByTime = dealsChartData?.find(deal => deal.date === item.date)

        // if (item.date === (dealsChartData ?? [])[i]?.date) {
        if (deakByTime) {

            // return Object.assign({}, item, { dealsCount: (dealsChartData ?? [])[i]?.count });
            return Object.assign({}, item, deakByTime);
        }
        return Object.assign({}, item);
    });


    const data = [
        // ...messChartData?.map(mess => {
        //     return {
        //         name: mess.date
        //     }
        // })
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (
        <StyledWrap>
            <h2>Динамика сообщений и заявок за месяц</h2>
            <LineChart
                width={800}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
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