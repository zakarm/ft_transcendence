"use client";

import styles from '../style.module.css';
import Image from 'next/image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {    CategoryScale, 
            LinearScale, 
            Title, 
            Legend, 
            Tooltip,
            PointElement, 
            LineElement 
        } from 'chart.js';
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { FaUserEdit } from "react-icons/fa";
import { SlUser } from "react-icons/sl";
import { GrFlag } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { GiPodiumWinner, GiLaurelsTrophy } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";
import { SiRepublicofgamers } from "react-icons/si";
import { BsFillChatLeftQuoteFill } from "react-icons/bs";
import { MdRoundaboutRight } from "react-icons/md";
import { ChartOptions, ChartData } from 'chart.js';
import { LineController } from 'chart.js/auto';
import Cookies from 'js-cookie';

interface MonthlyStats {
    months: string[];
    win: number[];
    lose: number[];
  }
  
  interface ProfileData {
    id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    intro: string | null;
    quote: string | null;
    rank: string | null;
    level: number | null;
    score: number | null;
    cover_url: string | null;
    location: string | null;
    total_games: number;
    win_games: number;
    lose_games: number;
    image_url: string | null;
    summary: MonthlyStats;
  }

export default function ({ params }: { params: { username: string } })
{
    const [profile, setProfile] = useState<ProfileData | null>(null);

    const fetchProfileData = async () => {
        const access = Cookies.get('access');
        if (access)
        {
            try {
                const res = await fetch(`http://localhost:8000/api/profile${params ? '/' + params.username : ''}` , {
                    headers: { Authorization: `Bearer ${access}` },
                });
        
                if (!res.ok)
                    throw new Error('Failed to fetch data');
    
                const data = await res.json();
                console.log(data);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        else
            console.log('Access token is undefined or falsy');
    }

    useEffect(() => {
            fetchProfileData();
    }, []);

    const [modalShow, setModalShow] = useState<boolean>(false);

    const [country, setCountry] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    const selectCountry = (val: string) => {
        setCountry(val);
        setRegion('');
      }
    
    const selectRegion = (val: string) => {
      setRegion(val);
    }

    const [validated, setValidated] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);
    };

    Chart.register(CategoryScale, LinearScale, Title, Legend, Tooltip, LineController, PointElement, LineElement);
    Chart.defaults.font.family = 'Itim';
    Chart.defaults.font.size = 14;

    const profileChartData = profile?.summary ?? {
        months: ["January", "February", "March", "April", "May", "June", "July"],
        win: [10, 20, 30, 40, 30, 15, 28],
        lose: [30, 20, 10, 40, 5, 15, 35]
    };

    const data: ChartData<'line'> = {
      labels: profileChartData.months,
      datasets: [
        {
            label: 'WIN',
            data: profileChartData.win,
            borderColor: 'rgba(116,206,151, 0.5)',
            backgroundColor: 'green',
            fill: false,
            tension: 0.1,
        },
        {
            label: 'LOSS',
            data: profileChartData.lose,
            borderColor: 'rgba(181,55,49, 0.5)',
            backgroundColor: 'red',
            fill: false,
            tension: 0.1,
        }
      ]
    };
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Win/Loss for ${profile?.username ?? 'Unknown'}`
          }
        }
      }
    
    const parag: string =   "Hey there! I'm Snake07, a dedicated ping pong gamer. From lightning-fast reflexes to strategic plays, I'm all about dominating the virtual table. Join me as we smash our way to victory, one pixel at a time!";
    
    return (
        <>
        {profile && (
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
                                <Image className={`${styles.profile_img}`} width={200   } height={200  } src={profile?.image_url ?? '/char3.png'} alt='Profile'/>
                                <div><span className='valo-font' style={{color: '#FFEBEB', fontSize: '1.5em'}}>{profile.username}</span></div>
                                <div className={`${styles.action} row d-flex justify-content-center`}>
                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button>Message</button></div>
                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button>invite</button></div>
                                </div>
                            </div> 
                            <div className='col-xl-4 order-xl-3 my-3'>
                                <div className={`${styles.info} d-flex`}>
                                    <div className='col-xl-5 col-6 d-flex flex-column justify-content-end'>
                                        <div><SlUser size='1.9em' color='#FFEBEB'/></div>
                                        <span style={{fontSize: '1.2em'}}>{profile.first_name} {profile.last_name}</span>
                                    </div>
                                    <div className='col-xl-5 col-6 d-flex flex-column justify-content-end '>
                                        <div><GrFlag size='1.9em' color='#FFEBEB'/></div>
                                        <span style={{fontSize: '1.2em'}}>{profile.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-5 order-xl-1 my-3'>
                                <div className={`${styles.info} d-flex `}>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4>Total game</h4>
                                        <span>{profile.total_games}</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4 style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>Win</h4>
                                        <span style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>{profile.win_games}%</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4>Lose</h4>
                                        <span>{profile.lose_games}%</span>
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
                                {profile.intro}
                            </p>
                            <h2 className='text-center' style={{color: '#ACACAC', fontFamily: 'itim'}}>{profile.quote}</h2>
                            <ProgressBar className={`${styles.progres_bar} my-5`} now={(profile?.level ?? 0) * 10} label={`${profile.level}`} striped variant="danger" animated/>
                            <hr className=" my-2 mx-2" style={{color: '#61627C', borderWidth: '2px'}}/>
                            <span style={{color: '#61627C', fontFamily: 'itim'}}>Rank</span>
                            <div className='d-flex flex-row my-4'>
                                <div className='col-3 d-flex flex-column text-center'>
                                    <span><GiPodiumWinner size='2em' color='#7aa6d6'/></span>
                                    <span style={{color: '#FFEBEB', fontFamily: 'itim'}}>{profile.rank}</span>
                                </div>
                                <div className='col-3 d-flex flex-column text-center'>
                                    <span><GiLaurelsTrophy size='2em' color='#7aa6d6'/></span>
                                    <span style={{color: '#FFEBEB', fontFamily: 'itim'}}>{profile.score}</span>
                                </div>
                            </div>
                            <Image className={`${styles.rank}`} width={200} height={200} src="/rank.png" alt='rank'/>
                            <div className={`col-6 ${styles.edit_btn} valo-font text-center p-2 m-2`} onClick={() => {setModalShow(true)}}><button onClick={() => {setModalShow(true)}}>EDIT PROFILE</button></div>
                            <div >
                            <Modal contentClassName={`${styles.edit_modal}`} show={modalShow} onHide={() => {setModalShow(false)}} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" scrollable animation>
                                <Modal.Header closeButton closeVariant='white'>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                      <span style={{color: '#FFEBEB', fontFamily: 'itim'}}><FaUserEdit color='#7aa6d6'/> Edit Profile</span>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <InputGroup hasValidation className={`mb-3`}>
                                          <InputGroup.Text style={{backgroundColor: '#2C3143'}}><SiRepublicofgamers color='#FFEBEB'/></InputGroup.Text>
                                          <Form.Control className={`${styles.form_control}`} required type="text" color='red' aria-label='Nickname' placeholder='Nickname' defaultValue="!Snake_007" style={{backgroundColor: '#2C3143'}}/>
                                            <Form.Control.Feedback type="invalid">
                                              Please choose a Nickname.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <InputGroup hasValidation className='mb-3'>
                                            <InputGroup.Text style={{backgroundColor: '#2C3143'}}><ImUsers color='#FFEBEB'/></InputGroup.Text>
                                            <Form.Control className={`${styles.form_control}`} required type="text" placeholder='Full name' aria-label='Full name' defaultValue="Othman Nouakchi" style={{backgroundColor: '#2C3143'}}/>
                                            <Form.Control.Feedback type="invalid">
                                              Please enter your full name.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <InputGroup hasValidation className='mb-3'>
                                            <InputGroup.Text style={{backgroundColor: '#2C3143'}}><BsFillChatLeftQuoteFill color='#FFEBEB'/></InputGroup.Text>
                                            <Form.Control className={`${styles.form_control}`} required type="text" placeholder='Quote' aria-label='Quote' defaultValue="Game on! 🎮 Play hard, level up! 💪" style={{backgroundColor: '#2C3143'}}/>
                                            <Form.Control.Feedback type="invalid">
                                              Please choose a Quote.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <InputGroup hasValidation className='mb-3'>
                                            <InputGroup.Text style={{backgroundColor: '#2C3143'}}><MdRoundaboutRight color='#FFEBEB'/></InputGroup.Text>
                                            <Form.Control className={`${styles.form_control}`} required as="textarea" placeholder='Intro' aria-label='Intro' defaultValue={parag} style={{backgroundColor: '#2C3143'}}/>
                                            <Form.Control.Feedback type="invalid">
                                              Please talk about yourslef.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <InputGroup className='mb-2 row p-0 m-0 d-flex justify-content-center'>
                                            <CountryDropdown
                                                classes={`${styles.selector} col-md-5 col-sm-10 mx-3 mb-1 p-2`}
                                                value={country}
                                                onChange={(val) => selectCountry(val)} />
                                            <RegionDropdown
                                                classes={`${styles.selector} col-md-5 col-sm-10 mx-3 mb-1 p-2`}
                                                country={country}
                                                value={region}
                                                onChange={(val) => selectRegion(val)} />
                                        </InputGroup>
                                        <div className='row d-flex justify-content-center pb-1 m-0'>
                                            <div className={`${styles.edit_btn} col-md-3 col-sm-5 valo-font text-center m-2 px-2`} onClick={() => {setModalShow(false)}}><button onClick={() => {setModalShow(false)}}>Cancel</button></div>
                                            <div className={`${styles.edit_btn} col-md-3 col-sm-5 valo-font text-center m-2 px-2`} ><button type="submit" >Save</button></div>
                                        </div>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                            </div>
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
        )}
        </>
    );
}