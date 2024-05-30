import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//   import faker from 'faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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

export const data = {
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


    return (
        <Line
            options={options}
            data={data}
            // style={{height: '60vh'}}
        />
        // <Line
        //   type="line"
        //   width={160}
        //   height={60}
        //   options={{
        //     title: {
        //       display: true,
        //       text: "COVID-19 Cases of Last 6 Months",
        //       fontSize: 20
        //     },
        //     legend: {
        //       display: true, //Is the legend shown?
        //       position: "top" //Position of the legend.
        //     }
        //   }}
        //   data={lineChartData}
        // />
    );
};
export default Chart;