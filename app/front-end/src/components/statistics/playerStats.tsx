import { useEffect } from 'react'

import styles from '@/app/statistics/styles.module.css'
import { PlayerStatsTypes } from '@/lib/StatisticsPageTypes/StatisticsPageTypes'
import Chart from 'chart.js/auto'


function    doughnutChart( stats : PlayerStatsTypes) {
    const   chart = Chart.getChart('doughnut_chart');

    chart?.destroy();
    const data = {
        labels: [
          'wins',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [stats.wins, stats.loses],
          backgroundColor: [
            'rgb(39, 178, 153)',
            'rgb(22, 22, 37)'
        ],
            borderColor : '#161625',
          hoverOffset: 4
        }],
        options: {
            elements: {
                arc: {
                    borderWidth: 0
                }
            }
          }
      };

      new Chart("doughnut_chart", {
        type: 'doughnut',
        data: data,
        options : {
            maintainAspectRatio: false,
        }
      })
}

function    RectangleText({text, backgroundColor} : {text : string, backgroundColor : string}) {
    return (
        <>
            <h3 className={`col-12 col-xxl-5 d-flex align-item-center  justify-content-center ${styles.rectangle_text}`} style={{backgroundColor : `${backgroundColor}`}}>
                <div className="align-self-center itim-font font-color">
                    {text}
                </div>
            </h3>
        </>
    )
}

function    PlayerStats({stats} : { stats : PlayerStatsTypes }) {

    useEffect(() => {
        doughnutChart(stats);
    }, [stats]);

    return (
        <>

            <div className={`col-12 col-xxl-4 d-flex justify-content-center m-1 p-1  ${styles.doughnut_chart_container}`}>
                <div className={`row ${styles.win_rate_text} itim-font font-color`}>
                        <h4 className="text-center w-100" style={{width : '110px'}}>
                            Win Rate
                        </h4>
                        <h4 className="text-center">
                            { stats && stats.win_rate ? stats.win_rate.toFixed(2) : "0" }%
                        </h4>
                </div>
                <canvas id="doughnut_chart"></canvas>
            </div>
            <div className="col-12 col-xxl-7 d-flex flex-wrap justify-content-around align-items-center m-1 p-1">
                <RectangleText text={`${stats.loses} LOSSES`} backgroundColor="#FF4755"/>
                <RectangleText text={`${stats.tackles} TACKLES`} backgroundColor="#39397C"/>
                <RectangleText text={`${stats.wins} WINS`} backgroundColor="#27B299"/>
                <RectangleText text={`${stats.scores} SCORES`} backgroundColor="#39397C"/>
            </div>
        </>
    )
}

export { PlayerStats }