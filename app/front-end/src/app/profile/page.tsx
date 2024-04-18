"use client";

import styles from './style.module.css';
import Image from 'next/image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {    CategoryScale, 
            LinearScale, 
            Title, 
            Legend, 
            Tooltip, 
            LineController, 
            PointElement, 
            LineElement 
        } from 'chart.js';
import { SlUser } from "react-icons/sl";
import { GrFlag } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { GiPodiumWinner, GiLaurelsTrophy } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa6";

export default function ()
{
    Chart.register(CategoryScale, LinearScale, Title, Legend, Tooltip, LineController, PointElement, LineElement);
    Chart.defaults.font.family = 'Itim';
    const labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data: Chart.ChartData = {
      labels: labels,
      datasets: [
        {
            label: 'WIN',
            data: [10, 20, 30, 40, 30, 15, 28, 25, 40, 50],
            borderColor: 'rgba(116,206,151, 0.5)',
            backgroundColor: 'green',
            font: {
            family: 'itim',
            size: 14,
            },
            fill: false,
            tension: 0.1,
        },
        {
            label: 'LOSS',
            data: [30, 20, 10, 40, 5, 15, 28, 90, 10, 88],
            borderColor: 'rgba(181,55,49, 0.5)',
            backgroundColor: 'red',
            font: {
            family: 'itim',
            size: 14,
            },
            fill: false,
            tension: 0.1,
        }
      ]
    };
    const options: Chart.ChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Win/Loss for !SNAKE_007'
          }
        }
      }
    
    return (
        <>
        <div className={`${styles.container} vh-100 border border-dark`}>
            <div className={`${styles.flag}`}>
                <Image className={`${styles.eagle}`} width={200} height={200} src="/eagle2.png" alt='flag'/>
                <div className={`${styles.square}`}></div>
                <div className={`${styles.triangle} my-1`}></div>
            </div>
            <div className={`${styles.bg_holder}`}></div>
                <div className={`${styles.holder}`}>
                    <div className='text-center'>
                        <div className='row m-0 p-0'>
                            <div className='col-5 '>
                                <div className={`${styles.info} d-flex `}>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4>Total game</h4>
                                        <span>613</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4 style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>Win</h4>
                                        <span style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>85%</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4>Lose</h4>
                                        <span>15%</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 text-center'>
                                <Image className={`${styles.profile_img}`} width={60} height={60} src="/char3.png" alt='Profile'/>
                                <div><span className='valo-font' style={{color: '#FFEBEB'}}>!SNAKE_007</span></div>
                                <div className={`${styles.action} d-flex`}>
                                    <div className={`col ${styles.btn}`}><button>Message</button></div>
                                    <div className={`col ${styles.btn}`}><button>+ invite</button></div>
                                </div>
                            </div> 
                            <div className='col-4'>
                                <div className={`${styles.info} d-flex`}>
                                    <div className='col-5 d-flex flex-column justify-content-end'>
                                        <div><SlUser size='1.9em' color='#FFEBEB'/></div>
                                        <span style={{fontSize: '1.2em'}}>Othman Nouakchi</span>
                                    </div>
                                    <div className='col-5 d-flex flex-column justify-content-end'>
                                        <div><GrFlag size='1.9em' color='#FFEBEB'/></div>
                                        <span style={{fontSize: '1.2em'}}>Morroco / Casablanca</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mx-4" style={{color: '#61627C', borderWidth: '2px'}}/>
                    <div className={`row justify-content-evenly m-0 p-0 p-4`}>
                        <div className={`${styles.data_holder} col-xl-4 col-lg-12 p-4 my-1`}>
                            <div className='d-flex align-items-center'>
                                <CiUser size='2em' color='#FFEBEB'/>
                                <span style={{color: '#FFEBEB', fontFamily: 'itim', fontSize: '1.8em'}}>About</span>
                            </div>
                            <hr className=" my-3" style={{color: '#61627C', borderWidth: '2px'}}/>
                            <p className='text-center px-3 py-3' style={{color: '#61627C', fontSize: '1.2em'}}>
                                Hey there! I'm Snake07, a dedicated ping pong gamer.
                                From  lightning-fast reflexes to strategic plays,
                                I'm all about dominating the  virtual table. 
                                Join me as we smash our way to victory,
                                one pixel at a  time!
                            </p>
                            <h2 className='text-center' style={{color: '#ACACAC', fontFamily: 'itim'}}>Game on! 🎮 Play hard, level up! 💪</h2>
                            <ProgressBar className={`${styles.progres_bar} my-5`} now={80.56} label={`${8.56}`} striped variant="danger" animated/>
                            <hr className=" my-2 mx-2" style={{color: '#61627C', borderWidth: '2px'}}/>
                            <span style={{color: '#61627C', fontFamily: 'itim'}}>Rank</span>
                            <div className='d-flex flex-row my-4'>
                                <div className='col-3 d-flex flex-column text-center'>
                                    <span><GiPodiumWinner size='2em' color='#7aa6d6'/></span>
                                    <span style={{color: '#FFEBEB', fontFamily: 'itim'}}>27</span>
                                </div>
                                <div className='col-3 d-flex flex-column text-center'>
                                    <span><GiLaurelsTrophy size='2em' color='#7aa6d6'/></span>
                                    <span style={{color: '#FFEBEB', fontFamily: 'itim'}}>10513</span>
                                </div>
                            </div>
                            <div className={`col-6 ${styles.edit_btn} valo-font text-center`}><button>EDIT PROFILE</button></div>
                            <Image className={`${styles.rank}`} width={200} height={200} src="/rank.png" alt='rank'/>
                        </div>
                        <div className={`${styles.data_holder} col-xl-6 col-lg-12 p-4 my-1`}>
                            <div className='d-flex align-items-center'>
                                <FaFileInvoice size='2em' color='#FFEBEB'/>
                                <span style={{color: '#FFEBEB', fontFamily: 'itim', fontSize: '1.8em'}}>Summary</span>
                            </div>
                            <hr className=" my-3" style={{color: '#61627C', borderWidth: '2px'}}/>
                            <div className='col p-0 m-0'>
                                <Line className='itim-font' options={options} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
    );
}