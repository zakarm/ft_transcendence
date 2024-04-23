"use client";

import styles from './style.module.css'
import Image from 'next/image';
import { FaHistory } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import GameHistoryCard from '../../components/table';
import ButtonValo from '../../components/button'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, 
    LinearScale, 
    Title, 
    Legend, 
    Tooltip, 
    LineController, 
    PointElement, 
    LineElement } from 'chart.js';


export default function Dashboard() {
    Chart.register(CategoryScale, LinearScale, Title, Legend, Tooltip, LineController, PointElement, LineElement);
    
    const options: Chart.ChartOptions = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Total minutes per month',
        },
        },
    };
    
    const labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    Chart.defaults.font.family = 'Itim';
    const data: Chart.ChartData = {
        labels,
        datasets: [
        {
            label: 'time',
            data: [10, 20, 30, 40, 30, 15, 28, 25, 40, 50],
            borderColor: 'rgb(255, 99, 132, 0)',
            backgroundColor: 'rgb(255, 99, 132, 0.5)',
            fill: true,
            font: {
            family: 'itim',
            size: 14,
            },
        },
        ],
    };

    return (
        <div className={`container-fluid ${styles.page_body} vh-100 d-flex flex-column`}>
                {/* <div className=""> */}
                    <div className={`row ${styles.card} m-1`}>
                        <div className='col-12 col-lg-7 text-start'>
                            <div className={`${styles.index_img}`}>
                                <div className={`row`}>
                                    <small className={`itim-font ${styles.small_title}`}>upcoming</small>
                                </div>
                                <div className={`row`}>
                                    {/* <div className={`col-12 col-md-8`}> */}
                                        <span className={`${styles.titles} valo-font display-3`}>THE ULTIMATE PING-PONG GAME</span>
                                    {/* </div> */}
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-12`}>
                                        <span className={`${styles.med_titles} itim-font h5`}>Welcome to our online ping pong paradise! Dive into
                                            the fast-paced  world of table tennis with our website,
                                            where players of all levels can  connect, compete,
                                            and improve their skills. From casual matches to intense
                                            tournaments, we've got everything you need to serve up some
                                            excitement!
                                        </span>
                                    </div>
                                    <ButtonValo value="Play" />
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 col-lg-5 ${styles.imageContainer}`}>
                            <div className={`h-100 ${styles.imageContainer}`}>
                                <div className={`${styles.ping_img}`}>
                                    <Image  src="/dashboard_char.png" width={350} height={350} alt="anime charachter" />
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                <div className="flex-grow-1 ">
                    <div className="row m-0 h-100 d-flex justify-content-center">
                        <div className={`col-12 col-lg-6 `}>
                            <div className={`${styles.card} ${styles.buttom_cards} h-100 p-4`}>
                                <div className={`d-flex flex-column`}>
                                    <div className='row'>
                                        <div className='col-6 d-flex align-items-start justify-content-start'>
                                        <p className={`itim-font ${styles.med_titles}`}><FaHistory color='#FFEBEB'/> GAME HISTORY</p>
                                        </div>
                                        <div className='col-6 d-flex align-items-end justify-content-end'>
                                            <p className={`itim-font ${styles.all_down}`}>ALL <FaChevronDown color='#FFEBEB'/></p>
                                        </div>
                                    </div>
                                    <hr style={{color: '#FFEBEB', backgroundColor: '#FFEBEB', height: 1}}/>
                                    <GameHistoryCard/>
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 col-lg-6 ${styles.chart_grid} `}>
                            <div className={`${styles.buttom_cards} ${styles.card} h-100 p-4`}>
                                <div className={`d-flex flex-column`}>
                                    <div className='row'>
                                        <div className='col-6 d-flex align-items-start justify-content-start'>
                                            <p className={`itim-font ${styles.med_titles}`}><BiStats color='#FFEBEB'/> MY GAME STATS</p>
                                        </div>
                                        <div className='col-6 d-flex align-items-end justify-content-end'>
                                            <p className={`itim-font ${styles.all_down}`}>ALL <FaChevronDown color='#FFEBEB'/></p>
                                        </div>
                                    </div>
                                    <hr style={{color: '#FFEBEB', backgroundColor: '#FFEBEB'}}/>
                                    <div className='col p-0 m-0'>
                                        <Line className='itim-font' options={options} data={data} />
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}