"use client";
import Image from 'next/image';
import React from 'react';
// import StepsPrograssBar from 'react-line-progress-bar-steps';
import { Radar } from 'react-chartjs-2';
import styles from './styles/chat_about.module.css';
import Chart from 'chart.js/auto';
import { ChartOptions, ChartData, RadarController } from 'chart.js';
import { IoCloseCircleSharp } from "react-icons/io5";

export default function ChatAbout() {

    Chart.register(RadarController);

    const data: ChartData<'radar'> = {
        labels: [
            'Win',
            'Loss',
            'High score',
            'Time',
            'totale games'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 150],
            fill: true,
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: 'rgba(0, 255, 0)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Example dataset background color
            borderColor: '#FE4755', // Example dataset border color
            //   tickColor: '#FFFFFF'
        }]
    };

    const options: ChartOptions<'radar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Win/Loss for test`
            }
        },
        scales: {
            r: {
                angleLines: {
                    color: 'grey'
                },
                grid: {
                    color: '#FFFFBB'
                },
                pointLabels: {
                    color: '#FE4755'
                },
                ticks: {
                    color: '#FE4755',
                }
            }
        }
    }

    return (
        <>
            <div className='d-flex flex-column vh-100'>
                <div className='p-4'>
                    <div className='text-end'><IoCloseCircleSharp color='white' size='1.5em' /></div>
                </div>
                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-evenly'>
                    <div><Image className={`${styles.about_img}`} width={200} height={200} src="/profile.jpeg" alt='welcome' /></div>
                    <div className='d-flex flex-column text-center'>
                        <span className='valo-font display-6'>OTHMAN NOUAKCHI</span>
                        <span className='h2' style={{ color: '#A6A0A0' }}>Casablanca, Morocco</span>
                        <span className='h2' style={{ color: '#A6A0A0' }}>Game on! 🎮 Play hard, level up! 💪</span>
                    </div>
                    <div className='col-12 p-0 m-0'><Radar className='itim-font' options={options} data={data} />&nbsp;</div>
                </div>
                <div className='d-flex flex-column p-4 pt-0'>
                    <hr className="m-3" style={{ color: '#FFEBEB', borderWidth: '2px' }} />
                    <div className='row m-0 text-center'>
                        <span className='col '>High score: 1337</span>
                        <span className='col'>Rank: 90135</span>
                    </div>
                    <span>Matches</span>
                    <div className='row m-0 p-2'>
                        <div className='col p-0 px-0' style={{ border: '1px solid #505050', borderRadius: '25px' }}>
                            {/* <StepsPrograssBar colorSet="dark" partialValue={12} totalValue={15} showPrecentage="end"
                                firstElStyle={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
                                lastElStyle={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
                            /> */}
                        </div>
                    </div>
                    <span>Tournaments</span>
                    <div className='row m-0 p-2'>
                        <div className='col p-0 px-0' style={{ border: '1px solid #505050', borderRadius: '25px' }}>
                            {/* <StepsPrograssBar colorSet="dark" partialValue={3} totalValue={5} showPrecentage="end"
                                firstElStyle={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
                                lastElStyle={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}