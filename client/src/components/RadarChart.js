import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { CategoryScale } from "chart.js";
import { getFormattedDate } from "../frontEndFuncs/miscFuncs";

ChartJS.register(CategoryScale);

export default function RadarChart(props) {
    const categories = process.env.REACT_APP_CATEGORIES.split(',');

    const lineColors = [
        [255, 0, 0],    // Bright Red
        [255, 153, 0],  // Orange
        [128, 0, 128],  // Purple
    ];

    const pointColors = [
        [204, 0, 0],
        [241, 194, 50],
        [56, 118, 29]
    ]

    function getPointColorStr(val) {
        const pointColor = pointColors[Math.ceil(val / 3) - 1]
        return `rgb(${pointColor[0]},${pointColor[1]},${pointColor[2]})`
    }

    const datasets = props.ratings.map((rating, index) => {
        const color = lineColors[index % 7]
        return (
            {
                label: getFormattedDate(rating.rating_date),
                data: categories.map((category) => rating[category]),
                fill: false,
                backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},0.2)`,
                borderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                pointBackgroundColor: (context) => getPointColorStr(context.raw),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
            }
        )
    });


    const data = {
        labels: categories,
        datasets: datasets
    }
    return (
        <div className='chart-container'>
            <Radar
                data={data}
                options={{
                    elements: {
                        line: {
                            borderWidth: 3

                        },
                        point: {
                            pointRadius: 5,
                            hoverRadius: 10,
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: true,
                                color: '#DCDCDC',
                                lineWidth: 2
                            },
                            grid: {
                                display: true,
                                circular: true,
                                color: (context) => context.index === 10 ? 'black' : 'white'
                            },
                            suggestedMin: 0,
                            suggestedMax: 10
                        },
                    }
                }}
            />
        </div>
    );
}