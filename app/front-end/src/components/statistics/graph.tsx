import { useEffect } from 'react'
import Chart from 'chart.js/auto';

import { FuturePredictionsTypes } from '@/lib/StatisticsPageTypes/StatisticsPageTypes'
import styles from '@/app/statistics/styles.module.css'

function    rearrangeValues({ futurePredictions } : {futurePredictions : FuturePredictionsTypes[] | string[]}) {
    const   dataArray : number[] = [];
    const   labelArray : string[] = [];

    if (Array.isArray(futurePredictions)) {
        futurePredictions.map((value) => {
            if (typeof value !== 'string') {
                console.log(value.predicted_score);
                dataArray.push(value.predicted_score);
                labelArray.push(value.date);
            }
        })
    }
    
    return ({dataArray, labelArray});
}

function    FuturePredictionGraph(futurePredictions : {futurePredictions : FuturePredictionsTypes[] | string[]}) {

    const   { dataArray, labelArray } = rearrangeValues(futurePredictions);

    useEffect(() => {
        let x = Chart.getChart("playerChart");
        x?.destroy();
        Chart.defaults.color = '#FFEBEB';
        Chart.defaults.font.family = "Itim"
        Chart.defaults.font.size = 11;
        new Chart("playerChart", {
            type : "line",
            data : {
                labels : labelArray,
                datasets : [{
                    label : "Future score predictions",
                    fill : true,
                    data : dataArray,
                    borderWidth : 1,
                    backgroundColor : "#222A38",
                    pointStyle : "circle",
                    pointBorderColor : '#ff4755',
                    pointBackgroundColor : '#ff4755',
                    pointHoverRadius: 15,
                }],
            },
            options : {
                maintainAspectRatio: false,
                scales : {
                    x : {
                        grid : {
                            drawOnChartArea : false
                        }
                    },
                    y : {
                        grid : {
                            drawOnChartArea : false
                        }
                    }
                },
            },
        })
    }, [dataArray, labelArray])

    return (
        <>
            <div className={`row ${styles.graph_container} p-3`}>
                <div className={`col-12`}>
                    <h3 className={`itim-font ps-4 font-color ${styles.table_title}`}>
                        Future prediction for scores
                    </h3>
                </div>
                    <div className={`${styles.canvas_container}`}>
                        <canvas id="playerChart"></canvas>
                    </div>
            </div>
        </>
    )
}

export { FuturePredictionGraph };