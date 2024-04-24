"use client";

import styles from './style.module.css'
import Image from 'next/image';
import { FaHistory } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import GameHistoryCard from '../../components/table';
import ButtonValo from '../../components/button'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { ChartOptions, ChartData } from 'chart.js';
import { LineController } from 'chart.js/auto';
import { useRouter } from 'next/navigation'
import { CategoryScale, 
    LinearScale, 
    Title, 
    Legend, 
    Tooltip,
    PointElement, 
    LineElement } from 'chart.js';

interface TotalMinutes {
    months: string[];
    minutes_months: number[];
}

interface Matches {
    match_id: number;
    score_user_one: number;
    score_user_two: number;
    match_start: string;
    match_end: string;
    tackle_user_one: number;
    tackle_user_two: number;
    user_one: number;
    user_two: number;
}

interface UserData {
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    matches_as_user_one: Matches[];
    matches_as_user_two: Matches[];
    total_minutes: TotalMinutes;
}

interface GameData {
    player: string;
    score: number;
    date: string;
    result: 'WIN' | 'LOSS';
  }

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<UserData | null>(null);
    const router = useRouter();
    const gameData: GameData[] = [];
    useEffect(() => {
        const fetchData = async () => 
        {
            const access = Cookies.get('access');

            if (access) {
                try {
                const response = await fetch('http://localhost:8000/api/dashboard', {
                    headers: { Authorization: `Bearer ${access}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDashboardData(data);
                } else if (response.status === 401) {
                    console.log('Unauthorized');
                } else {
                    console.error('An unexpected error happened:', response.status);
                }
                } catch (error) {
                console.error('An unexpected error happened:', error);
                }
            } else {
                console.log('Access token is undefined or falsy');
            }
            };
        fetchData();
    }, []);

    if (dashboardData) {
        dashboardData.matches_as_user_one.forEach((match) => {
            gameData.push({
            player: dashboardData.username,
            score: match.score_user_one,
            date: match.match_start,
            result: match.score_user_one > match.score_user_two ? 'WIN' : 'LOSS',
            });
        });

        dashboardData.matches_as_user_two.forEach((match) => {
            gameData.push({
            player: dashboardData.username,
            score: match.score_user_two,
            date: match.match_start,
            result: match.score_user_two > match.score_user_one ? 'WIN' : 'LOSS',
            });
        });
    }

    function clickButton(){
        router.push('/game');
    }

    const chartLabels = dashboardData?.total_minutes.months || [];
    const chartData = dashboardData?.total_minutes.minutes_months || [];
    
    Chart.register(
        CategoryScale, 
        LinearScale, 
        Title, 
        Legend, 
        Tooltip, 
        LineController, 
        PointElement, 
        LineElement);
    
    Chart.defaults.font.family = 'Itim';
    Chart.defaults.font.size = 14;
    const options: ChartOptions<'line'> = {
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
    
    const labels: string[] = chartLabels;
    const data: ChartData<'line'>  = {
        labels,
        datasets: [
            {
                label: 'time',
                data: chartData,
                borderColor: 'rgb(255, 99, 132, 0)',
                backgroundColor: 'rgb(255, 99, 132, 0.5)',
                fill: true,
            },
        ],
    };

    return (
        <div className={`container-fluid ${styles.page_body} vh-100`}>
            <div className="row m-0">
                <div className="col-12 mt-5">
                    <div className={`row ${styles.card} m-1`}>
                        <div className='col-12 col-md-6'>
                            <div className={`${styles.index_img}`}>
                                <div className={`row`}>
                                    <small className={`itim-font ${styles.small_title}`}>upcoming</small>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-8`}>
                                        <h1 className={`${styles.titles} valo-font`}>THE ULTIMATE PING-PONG GAME</h1>
                                    </div>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-12`}>
                                        <h6 className={`${styles.med_titles} itim-font`}>Welcome to our online ping pong paradise! Dive into
                                            the fast-paced  world of table tennis with our website,
                                            where players of all levels can  connect, compete,
                                            and improve their skills. From casual matches to intense
                                            tournaments, we've got everything you need to serve up some
                                            excitement!
                                        </h6>
                                    </div>
                                    <div>
                                        <ButtonValo onClick={clickButton} value="Play" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className={`${styles.imageContainer} position-relative`}>
                                <Image src="/dashboard_char.png" width={350} height={350} alt="anime charachter" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className={`d-flex flex-column p-3 ${styles.card} ${styles.buttom_cards} m-1`}>
                                <div className='row'>
                                    <div className='col-6 d-flex align-items-start justify-content-start'>
                                    <p className={`itim-font ${styles.med_titles}`}><FaHistory color='#FFEBEB'/> GAME HISTORY</p>
                                    </div>
                                    <div className='col-6 d-flex align-items-end justify-content-end'>
                                        <p className={`itim-font ${styles.all_down}`}>ALL <FaChevronDown color='#FFEBEB'/></p>
                                    </div>
                                </div>
                                <hr style={{color: '#FFEBEB', backgroundColor: '#FFEBEB', height: 1}}/>
                                <GameHistoryCard data={gameData}/>
                            </div>
                        </div>
                        <div className={`col-12 col-lg-6 ${styles.chart_grid}`}>
                            <div className={`d-flex flex-column p-3 ${styles.card} ${styles.buttom_cards} m-1`}>
                                <div className='row'>
                                    <div className='col-6 d-flex align-items-start justify-content-start'>
                                        <p className={`itim-font ${styles.med_titles}`}><BiStats color='#FFEBEB'/> MY GAME STATS</p>
                                    </div>
                                    <div className='col-6 d-flex align-items-end justify-content-end'>
                                        <p className={`itim-font ${styles.all_down}`}>ALL <FaChevronDown color='#FFEBEB'/></p>
                                    </div>
                                </div>
                                <hr style={{color: '#FFEBEB', backgroundColor: '#FFEBEB', height: 1}}/>
                                <div className='d-flex align-items-center justify-content-center h-75'>
                                    <div>&nbsp;</div>
                                    <Line className='itim-font' options={options} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}