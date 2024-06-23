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
import { ToastContainer, toast } from 'react-toastify';
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
import 'react-toastify/dist/ReactToastify.css';

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
    monthly_stats: MonthlyStats;
  }

  interface User {
    id: number;
    username: string;
    image_url: string;
  }

  interface Friend_ {
    user: User;
    is_accepted: boolean;
    is_user_from: boolean;
    blocked: boolean;
  }

export default function ({ params }: { params: { username: string } })
{
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [user, setUser] = useState<Friend_ | undefined>(undefined);

    const fetchProfileData = async () => {
        const access = Cookies.get('access');
        if (access)
        {
            try {
                const csrftoken = Cookies.get('csrftoken') || '';
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/profile${params ? '/' + params.username : ''}`,
                    {
                        headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
                    },
                );

                if (!res.ok)
                    throw new Error('Failed to fetch data');

                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        else
            console.log('Access token is undefined or falsy');
}

const fetchUser = async () => {
    const access = Cookies.get('access');
    if (access)
        {
        try {
                const csrftoken = Cookies.get('csrftoken') || '';
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/friends`, {
                    headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
                });

                if (!res.ok)
                    throw new Error('Failed to fetch data');

                const data = await res.json();
            if (!profile)
                return ;
            const transData = data.friends.filter((user: Friend_) => user.user.username === profile.username).map((friend: Friend_) => ({
              user: {
                  id: friend.user.id,
                  username: friend.user.username,
                  image_url: friend.user.image_url,
              },
              is_accepted: friend.is_accepted,
              is_user_from: friend.is_user_from,
              blocked: friend.blocked
            }));
            if (transData)
                setUser(transData[0]);
          } catch (error) {
              console.error('Error fetching data: ', error);
          }
        }
        else
          toast.error('Unauthorized');
    }

    const fetchUserState = async (api: string, message: string, username: string) => {
        const access = Cookies.get('access');

        if (access)
        {
          try {
            const csrftoken = Cookies.get('csrftoken') || '';
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/${api}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ username: username }),
            });

            if (!res.ok)
            {
              if (res.status === 400)
                return toast.error('Action not allowed');
              else
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();
            if (data)
            {
              if (api === 'friends-remove' || api === 'friends-add')
              {
                if (api === 'friends-remove' && user)
                    setUser(undefined);
                else
                {
                    setUser({
                      user: {
                        id: 0,
                        username: '',
                        image_url: ''
                      },
                      is_user_from: true,
                      is_accepted: false,
                      blocked: false
                    });
                }
              }
              else if (api === 'friends-accept' && user)
              {
                setUser({
                    user: {
                      id: user.user.id,
                      username: user.user.username,
                      image_url: user.user.image_url
                    },
                    is_user_from: false,
                    is_accepted: true,
                    blocked: false
                  });
              }
              toast.success(message);
            }
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        }
        else
          toast.error('Unauthorized');
      }

    useEffect(() => {
        fetchProfileData();
    }, []);

    useEffect(() => {
        fetchUser();
    }, [profile]);

    Chart.register(CategoryScale, LinearScale, Title, Legend, Tooltip, LineController, PointElement, LineElement);
    Chart.defaults.font.family = 'Itim';
    Chart.defaults.font.size = 14;

    const data: ChartData<'line'> = {
      labels:  profile?.monthly_stats?.months || [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June"],
      datasets: [
        {
            label: 'WIN',
            data:  profile?.monthly_stats?.win || [],
            borderColor: 'rgba(116,206,151, 0.5)',
            backgroundColor: 'green',
            fill: false,
            tension: 0.1,
        },
        {
            label: 'LOSS',
            data:  profile?.monthly_stats?.lose || [],
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

                                    {
                                        user ?
                                        (
                                            user.is_accepted ? (
                                                <div className='row d-flex justify-content-center'>
                                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button>Message</button></div>
                                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button onClick={() => fetchUserState('friends-remove', 'Removed from friends', params.username)}>Remove</button></div>
                                                </div>
                                            ) : (
                                                user.is_user_from ? (
                                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button disabled>Waiting</button></div>
                                                ) : (
                                                    <div className={`col-md-5 col-8 ${styles.btn}`}><button onClick={() => fetchUserState('friends-accept', 'added to friends', params.username)}>Accept</button></div>
                                                )
                                            )
                                        ) : (
                                            <div className={`col-md-5 col-8 ${styles.btn}`}><button onClick={() => fetchUserState('friends-add', 'Friend Request Sent', params.username)}>Invite</button></div>
                                        )
                                    }
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
                                        <span style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>
                                            {profile.total_games !== 0 ? ((profile.win_games / profile.total_games) * 100).toFixed(1) : '0.0'}%
                                        </span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end '>
                                        <h4>Lose</h4>
                                        <span>
                                            {profile.total_games !== 0 ? ((profile.lose_games / profile.total_games) * 100).toFixed(1) : '0.0'}%
                                        </span>
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
                            <ProgressBar className={`${styles.progres_bar} my-5`} now={(profile?.level ?? 0) * 10} label={`${profile.level} %`} striped variant="danger" animated/>
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
