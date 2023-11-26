import React from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getBritishDateFormat } from "../frontEndFuncs/prettyFuncs";

Chart.register(CategoryScale);

export default function RadarChart(props) {
    const categories = process.env.REACT_APP_CATEGORIES.split(',');

    const rainbowColors = [
        [255, 0, 0],
        [255, 165, 0],
        [255, 255, 0],
        [0, 128, 0],
        [0, 0, 255],
        [75, 0, 130],
        [128, 0, 128]
    ];

    const datasets = props.ratings.map((rating, index) => {
        const color = rainbowColors[index % 7]
        return (
            {
                label: getBritishDateFormat(rating.rating_date),
                data: categories.map((category) => rating[category]),
                fill: true,
                backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},0.2)`,
                borderColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                pointBackgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: `rgb(${color[0]},${color[1]},${color[2]})`
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
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: false
                            },
                            suggestedMin: 0,
                            suggestedMax: 10
                        }
                    }
                }}
            />
        </div>
    );
}