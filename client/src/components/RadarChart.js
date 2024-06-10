import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { CategoryScale } from "chart.js";
import { getFormattedDate } from "../frontEndFuncs/miscFuncs";
import globals from "../globals";

ChartJS.register(CategoryScale);

export default function RadarChart({ ratings }) {

    const categories = globals.CATEGORIES;
    const pretty_categories = globals.PRETTY_CATEGORIES;

    const lineColors = [
        [255, 0, 0],    // Bright Red
        [255, 153, 0],  // Orange
        [128, 0, 128],  // Purple
        [0, 255, 0],    // Green
        [0, 0, 255],    // Blue
        [255, 255, 0],  // Yellow
        [0, 128, 128],  // Teal
    ];

    const pointColors = [
        [204, 0, 0],
        [241, 194, 50],
        [56, 118, 29]
    ]

    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#99ffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    function getPointColorStr(val) {
        const pointColor = pointColors[Math.ceil(val / 3) - 1]
        return `rgb(${pointColor[0]},${pointColor[1]},${pointColor[2]})`
    }

    const datasets = ratings.map((rating, index) => {
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
        labels: pretty_categories,
        datasets: datasets
    }

    const circleDiameter = 10
    var pointSize = 6;
    var fontSize = 10;

    if (window.innerWidth >= 765) {
        pointSize = 11;
        fontSize = 20;
    } else if (window.innerWidth >= 680) {
        pointSize = 8;
        fontSize = 12;

    } else if (window.innerWidth >= 570) {
        pointSize = 7;
        fontSize = 12;
    }

    return (
        <div className='chart-container'>
            <Radar
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            borderWidth: 3
                        },
                        point: {
                            pointRadius: pointSize,
                            hoverRadius: 1.1 * pointSize,
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
                                color: (context) => context.index === circleDiameter ? 'black' : 'white'
                            },
                            suggestedMin: 0,
                            suggestedMax: 10,
                            ticks: {
                                font: {
                                    size: fontSize,
                                }
                            },
                            pointLabels: {
                                font: {
                                    size: fontSize,
                                }
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: fontSize
                                }
                            }
                        },
                        customCanvasBackgroundColor: {
                            color: 'white',
                        }
                    }

                }

                }
                plugins={[plugin]}
            />
        </div>
    );
}