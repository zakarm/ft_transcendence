'use client';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import styles from './styles/chat_about.module.css';
import Chart from 'chart.js/auto';
import { ChartOptions, ChartData, RadarController } from 'chart.js';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface Props {
  handleClose: () => void;
  selectedChat: string;
}

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
  all_time_minutes: number;
  image_url: string | null;
  summary: MonthlyStats;
}

export default function ChatAbout({ handleClose, selectedChat }: Props) {
  Chart.register(RadarController);

  const [profile, setProfile] = useState<ProfileData | undefined>({
    id: 0,
    username: '.....',
    email: '...',
    first_name: '...',
    last_name: '...',
    intro: '...',
    quote: '...',
    rank: '0',
    level: 0,
    score: 0,
    cover_url: '',
    location: '...',
    total_games: 0,
    win_games: 0,
    lose_games: 0,
    all_time_minutes: 0,
    image_url: '/assets/images/gameProfiles/default_profile.png',
    summary: { months: [], win: [], lose: [] },
  });

  const fetchProfileData = async () => {
    const access = Cookies.get('access');
    if (access && selectedChat !== 'none') {
      try {
        const csrftoken = Cookies.get('csrftoken') || '';
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/profile/${selectedChat}`, {
          headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
        });

        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error(`Error : ${error}`);
      }
    } else if (selectedChat !== 'none') toast.error('Access token is undefined or false');
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [selectedChat]);

  const data: ChartData<'radar'> = {
    labels: ['Win', 'Loss', 'High score', 'Time', 'totale games'],
    datasets: [
      {
        label: 'Dataset',
        data: [
          profile?.win_games ?? 0,
          profile?.lose_games ?? 0,
          profile?.score ?? 0,
          profile?.all_time_minutes ?? 0,
          profile?.total_games ?? 0,
        ],
        fill: true,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: 'rgba(0, 255, 0)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FE4755',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Win/Lose/High score/Time/totale games`,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'grey',
        },
        grid: {
          color: '#FFFFBB',
        },
        pointLabels: {
          color: '#FE4755',
        },
        ticks: {
          color: '#FE4755',
        },
      },
    },
  };

  return (
    <>
      {profile === undefined ? (
        <div className="vh-100 border border-dark d-flex flex-column align-items-center justify-content-center">
          <span style={{ fontFamily: 'itim', color: 'white' }}>User Not Found !!</span>
        </div>
      ) : (
        <div className="d-flex flex-column vh-100 overflow-auto">
          <div className={`p-4 ${styles.close_btn}`}>
            <div className="text-end" style={{ cursor: 'pointer' }} onClick={handleClose}>
              <IoCloseCircleSharp color="white" size="1.5em" />
            </div>
          </div>
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
            <div>
              <img
                className={`${styles.about_img}`}
                width={200}
                height={200}
                src={profile?.image_url ?? '/assets/images/gameProfiles/default_profile.png'}
                alt="welcome"
              />
            </div>
            <div className="d-flex flex-column text-center">
              <span className="valo-font display-6">
                {profile?.first_name} {profile?.last_name}
              </span>
              <span className="h2" style={{ color: '#A6A0A0' }}>
                {profile?.location}
              </span>
              <span className="h2" style={{ color: '#A6A0A0' }}>
                {profile?.quote}
              </span>
            </div>
            <div className="col-12 p-0 m-0">
              <Radar className="itim-font" options={options} data={data} />
              &nbsp;
            </div>
          </div>
          <div className="d-flex flex-column p-4 pt-0" style={{ color: '#FFEBEB', fontFamily: 'itim' }}>
            <hr className="m-3" style={{ color: '#FFEBEB', borderWidth: '2px' }} />
            <div className="row m-0 text-center">
              <span className="col">High score: {profile?.score}</span>
              <span className="col">Rank: {profile?.rank}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
