'use client';

import styles from './style.module.css';
import { FaHistory } from 'react-icons/fa';
import { BiStats } from 'react-icons/bi';
import GameHistoryCard from '../../components/table';
import ButtonValo from '../../components/button';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { ChartOptions, ChartData } from 'chart.js';
import { LineController } from 'chart.js/auto';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'react-bootstrap';
import { ExportMinutes } from '@/components/exportMatch'
import { ExportCSV } from '../../components/export';
import { ToastContainer, toast } from 'react-toastify';
import { CategoryScale, LinearScale, Title, Legend, Tooltip, PointElement, LineElement } from 'chart.js';

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
    image_url: string;
    first_name: string | null;
    last_name: string | null;
    matches_as_user_one: Matches[];
    matches_as_user_two: Matches[];
    total_minutes: TotalMinutes;
}

interface GameReport {
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    matches_as_user_one: Matches[];
    matches_as_user_two: Matches[];
    minutes_per_day: [number, number, number][];
}

interface GameData {
    image: string;
    player: string;
    score: number;
    date: string;
    result: 'WIN' | 'LOSS';
}

interface minutes_months
{
    month: number;
    day: number;
    minutes: number;
}

function formatDate(str: string): string {
    const date = new Date(str);
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const newTime: string = Intl.DateTimeFormat('en-US', timeOptions).format(date);
    const newDate: string = Intl.DateTimeFormat('en-US', dateOptions).format(date);
    return `${newDate}, ${newTime}`;
}

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<UserData | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenGameStats, setDropdownOpenGameStats] = useState(false);
    const [csvData, setCsvData] = useState<UserData | null>(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleDropdownGameStats = () => setDropdownOpenGameStats(!dropdownOpenGameStats);

    const router = useRouter();
    const gameData: GameData[] = [];
    const gameCsv: GameData[] = [];
    let mappedData: minutes_months[] = [];
    useEffect(() => {
        const fetchData = async () => {
            const access = Cookies.get('access');
            if (access) {
                try {
                    const csrftoken = Cookies.get('csrftoken') || '';
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/dashboard`, {
                        headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setDashboardData(data);
                    } else if (response.status === 401) {
                        toast.error('Unauthorized');
                    } else {
                        console.error('An unexpected error happened:', response.status);
                    }
                } catch (error) {
                    console.error('An unexpected error happened:', error);
                }
            } else {
                toast.error('Unauthorized');
            }
        };
        fetchData();
    }, []);

    if (dashboardData) {
        dashboardData.matches_as_user_one.forEach((match) => {
            gameData.push({
                image: dashboardData.image_url,
                player: dashboardData.username,
                score: match.score_user_one,
                date: formatDate(match.match_start),
                result: match.score_user_one > match.score_user_two ? 'WIN' : 'LOSS',
            });
        });

        dashboardData.matches_as_user_two.forEach((match) => {
            gameData.push({
                image: dashboardData.image_url,
                player: dashboardData.username,
                score: match.score_user_two,
                date: formatDate(match.match_start),
                result: match.score_user_two > match.score_user_one ? 'WIN' : 'LOSS',
            });
        });
    }

    const fetchDataForCsv = async (period: string) => {
        const access = Cookies.get('access');
        if (!access) return;
        try {
            const csrftoken = Cookies.get('csrftoken') || '';
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/game-stats-report`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${access}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ period }),
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else if (response.status === 401) {
                toast.error('Unauthorized');
            } else {
                console.error('An unexpected error happened:', response.status);
            }
            return null;
        } catch (error) {
            console.error('An unexpected error happened:', error);
        }
    };

    const handleDropdownSelect = async (value: string) => {
        const data: UserData = await fetchDataForCsv(value);
        if (data) {
            data.matches_as_user_one.forEach((match) => {
                gameCsv.push({
                    image: data.image_url,
                    player: data.username,
                    score: match.score_user_one,
                    date: match.match_start,
                    result: match.score_user_one > match.score_user_two ? 'WIN' : 'LOSS',
                });
            });
            data.matches_as_user_two.forEach((match) => {
                gameCsv.push({
                    image: data.image_url,
                    player: data.username,
                    score: match.score_user_two,
                    date: match.match_start,
                    result: match.score_user_two > match.score_user_one ? 'WIN' : 'LOSS',
                });
            });
        }
        ExportCSV(gameCsv, 'game_history_' + value + '.csv');
        toggleDropdown();
    };

    const handleDropdownSelect2 = async (value: string) => {
        const data: GameReport = await fetchDataForCsv(value);
        mappedData = data.minutes_per_day.map(([month, day, minutes]) => ({
            day,
            month,
            minutes,
        }));
        ExportMinutes(mappedData, 'game_stats_' + value + "_" + new Date().getFullYear() + '.csv');
        toggleDropdown();
    };

    function clickButton() {
        router.push('/game');
    }

    const chartLabels = dashboardData?.total_minutes.months || [];
    const chartData = dashboardData?.total_minutes.minutes_months || [];

    Chart.register(CategoryScale, LinearScale, Title, Legend, Tooltip, LineController, PointElement, LineElement);

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
    const data: ChartData<'line'> = {
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
            <div className="row m-0 mt-5">
                <div className="col-12 mt-5">
                    <div className={`row ${styles.card} m-1`}>
                        <div className="col-12 col-md-6">
                            <div className={`${styles.index_img}`}>
                                <div className={`row`}>
                                    <small className={`itim-font ${styles.small_title}`}>upcoming</small>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-8`}>
                                        <h1 className={`${styles.titles} valo-font`}>THE ULTIMATE PING-PONG GAME.</h1>
                                    </div>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-12`}>
                                        <h6 className={`${styles.med_titles} itim-font`}>
                                            Welcome to our online ping pong paradise! Dive into the fast-paced world of
                                            table tennis with our website, where players of all levels can connect,
                                            compete, and improve their skills. From casual matches to intense
                                            tournaments, we've got everything you need to serve up some excitement!
                                        </h6>
                                    </div>
                                    <div>
                                        <ButtonValo onClick={clickButton} value="PLAY" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`${styles.imageContainer} position-relative`}>
                                <img
                                    src="/dashboard_char.png"
                                    width={350}
                                    height={350}
                                    style={{ width: 'auto', height: 'auto' }}
                                    alt="anime charachter"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className={`d-flex flex-column p-3 ${styles.card} ${styles.buttom_cards} m-1`}>
                                <div className="row">
                                    <div className="col-6 d-flex align-items-start justify-content-start">
                                        <p className={`itim-font ${styles.med_titles}`}>
                                            <FaHistory color="#FFEBEB" /> GAME HISTORY
                                        </p>
                                    </div>
                                    <div className="col-6 d-flex align-items-end justify-content-end">
                                        <Dropdown onClick={toggleDropdown}>
                                            <Dropdown.Toggle
                                                variant="dark"
                                                id="dropdown-basic"
                                                className={`itim-font ${styles.all_down}`}
                                            >
                                                ALL
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu show={dropdownOpen}>
                                                <Dropdown.Item
                                                    className="itim-font"
                                                    onClick={() => handleDropdownSelect('day')}
                                                >
                                                    This Day
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className="itim-font"
                                                    onClick={() => handleDropdownSelect('month')}
                                                >
                                                    This Month
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className="itim-font"
                                                    onClick={() => handleDropdownSelect('year')}
                                                >
                                                    This Year
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <hr
                                    style={{
                                        color: '#FFEBEB',
                                        backgroundColor: '#FFEBEB',
                                        height: 1,
                                    }}
                                />
                                <GameHistoryCard data={gameData} />
                            </div>
                        </div>
                        <div className={`col-12 col-lg-6 ${styles.chart_grid}`}>
                            <div className={`d-flex flex-column p-3 ${styles.card} ${styles.buttom_cards} m-1`}>
                                <div className="row">
                                    <div className="col-6 d-flex align-items-start justify-content-start">
                                        <p className={`itim-font ${styles.med_titles}`}>
                                            <BiStats color="#FFEBEB" /> MY GAME STATS
                                        </p>
                                    </div>
                                    <div className="col-6 d-flex align-items-end justify-content-end">
                                        <Dropdown onClick={toggleDropdownGameStats}>
                                            <Dropdown.Toggle
                                                variant="dark"
                                                id="dropdown-basic"
                                                className={`itim-font ${styles.all_down}`}
                                            >
                                                ALL
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu show={dropdownOpenGameStats}>
                                                <Dropdown.Item
                                                    className="itim-font"
                                                    onClick={() => handleDropdownSelect2('month')}
                                                >
                                                    This Month
                                                </Dropdown.Item>
                                                <Dropdown.Item className="itim-font"
                                                    onClick={() => handleDropdownSelect2('3_months')}>
                                                    3 Months
                                                </Dropdown.Item>
                                                <Dropdown.Item className="itim-font"
                                                    onClick={() => handleDropdownSelect2('year')}>
                                                    1 Year
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <hr
                                    style={{
                                        color: '#FFEBEB',
                                        backgroundColor: '#FFEBEB',
                                        height: 1,
                                    }}
                                />
                                <div className="d-flex align-items-center justify-content-center h-75">
                                    <div>&nbsp;</div>
                                    <Line className="itim-font" options={options} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
