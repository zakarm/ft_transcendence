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
import Modal from 'react-bootstrap/Modal'
import { SlUser } from "react-icons/sl";
import { GrFlag } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { GiPodiumWinner, GiLaurelsTrophy } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa6";
import { useState } from 'react';

export default function ()
{
    const [modalShow, setModalShow] = useState(false);
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
                            <div className='col-xl-2 order-xl-2 my-3 text-center'>
                                <Image className={`${styles.profile_img}`} width={200   } height={200  } src="/char3.png" alt='Profile'/>
                                <div><span className='valo-font' style={{color: '#FFEBEB', fontSize: '1.5em'}}>!SNAKE_007</span></div>
                                <div className={`${styles.action} row d-flex justify-content-center`}>
                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button>Message</button></div>
                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button>invite</button></div>
                                </div>
                            </div> 
                            <div className='col-xl-4 order-xl-3 my-3'>
                                <div className={`${styles.info} d-flex`}>
                                    <div className='col-xl-5 col-6 d-flex flex-column justify-content-end'>
                                        <div><SlUser size='1.9em' color='#FFEBEB'/></div>
                                        <span style={{fontSize: '1.2em'}}>Othman Nouakchi</span>
                                    </div>
                                    <div className='col-xl-5 col-6 d-flex flex-column justify-content-end '>
                                        <div><GrFlag size='1.9em' color='#FFEBEB'/></div>
                                        <span style={{fontSize: '1.2em'}}>Morroco / Casablanca</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-5 order-xl-1 my-3'>
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
                            <Image className={`${styles.rank}`} width={200} height={200} src="/rank.png" alt='rank'/>
                            <div className={`col-6 ${styles.edit_btn} valo-font text-center p-2 m-2`} onClick={() => {setModalShow(true)}}><button onClick={() => {setModalShow(true)}}>EDIT PROFILE</button></div>
                            <Modal className='edit_modal' show={modalShow} onHide={() => {setModalShow(false)}} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" scrollable animation>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                      <span style={{color: '#FFEBEB', fontFamily: 'itim', fontSize: '1.8em'}}>Edit Profile</span>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                </Modal.Body>
                                <Modal.Footer>

                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div className={`${styles.data_holder} col-xl-6 col-lg-12 p-4 my-1`}>
                            <div className='d-flex align-items-center'>
                                <FaFileInvoice size='2em' color='#FFEBEB'/>
                                <span style={{color: '#FFEBEB', fontFamily: 'itim', fontSize: '1.8em'}}>Summary</span>
                            </div>
                            <hr className=" my-3" style={{color: '#61627C', borderWidth: '2px'}}/>
                            <div className='col p-0 m-0'>
                                <Line className='itim-font' options={options} data={data} />
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
    );
}