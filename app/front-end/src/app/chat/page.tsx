"use client";

import { InputGroup } from 'react-bootstrap';
import styles from './style.module.css';
import Image from 'next/image';
import User from '../../components/user';
import UserChat from '@/components/user_chat';
import friends from '../../components/friends.json';
import StepsPrograssBar from 'react-line-progress-bar-steps';

import { CiSearch } from "react-icons/ci";
import Form from 'react-bootstrap/Form';
import { IoCloseCircleSharp } from "react-icons/io5";
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

export default function ()
{
    const friendsData = friends.sort((usr1, usr2) => {
        if (usr1.connected && !usr2.connected) {
            return -1;
        }
          // Sort disconnected users second
        if (!usr1.connected && usr2.connected) {
            return 1;
        }
          // Sort by ID if isConnected flag is the same
        return usr1.id - usr2.id;
    })
    // .slice(0, 5)
    .map((user, index) => 
        <User key={index} src={user.image_url} isConnected={user.connected}/>
    );

    const data = Chart.ChartData = {
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
          color: '#fe4755',
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Example dataset background color
          borderColor: '#FE4755', // Example dataset border color
          tickColor: '#FFFFFF'
        }]
      };

      const options: Chart.ChartOptions = {
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
                }
            }
        }
      }

    return (
        <>
            <div className="row vh-100 p-0 m-0 ">
              <div className="col-9 p-0 m-0 d-flex flex-row ">
                <div className="col-4 ">
                  <div className="d-flex flex-column  vh-100">
                    <div className="w-100">
                        <div className={`${styles.welcome}  text-start`}>
                            <span className='d-flex flex-column p-2 text-center valo-font '>
                                <span className='display-5' style={{color: '#FF4755'}}>GAME HUB</span>
                                <span className='h2' style={{color: '#FFEBEB'}}>LET'S CHAT</span>
                                <span className='h2' style={{color: '#FFEBEB'}}>& PLAY</span>
                            </span>
                            <Image className={`${styles.welcome_img}`} width={200} height={200} src="/welcome.png" alt='welcome'/>
                        </div>
                        <div className={`mx-3 mb-2`}>
                            <InputGroup size="lg">
                              <InputGroup.Text style={{backgroundColor: '#2C3143'}}><CiSearch color='#FFEBEB'/></InputGroup.Text>
                              <Form.Control className={`${styles.form_control}`} type="text" color='red' aria-label='search' placeholder='Enter for search...' style={{backgroundColor: '#2C3143'}}/>
                            </InputGroup>
                        </div>
                        <div className={`${styles.usr_container} d-flex overflow-auto`}>
                            {friendsData}
                        </div>
                        <hr className="m-3" style={{color: '#FFEBEB', borderWidth: '2px'}}/>
                    </div>
                    <div className={`${styles.chat_container} p-2 flex-grow-1`}>
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                            <UserChat />
                    </div>
                  </div>
                </div>
                <div className="col-8 p-0 m-0 border border-warning">

                </div>
              </div>
              <div className={`${styles.about_container} col-3 p-0 m-0 d-flex flex-column`}>
                <div className='p-4'>
                    <div className='text-end'><IoCloseCircleSharp color='white' size='1.5em'/></div>
                </div>
                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-evenly'>
                    <div><Image className={`${styles.about_img}`} width={200} height={200} src="/profile.jpeg" alt='welcome'/></div>
                    <div className='d-flex flex-column text-center'>
                        <span className='valo-font display-6'>OTHMAN NOUAKCHI</span>
                        <span className='h2' style={{color: '#A6A0A0'}}>Casablanca, Morocco</span>
                        <span className='h2' style={{color: '#A6A0A0'}}>Game on! 🎮 Play hard, level up! 💪</span>
                    </div>
                    <div className='col-12 p-0 m-0'><Radar className='itim-font' options={options} data={data}/>&nbsp;</div>
                </div>
                <div className='d-flex flex-column p-4 pt-0'>
                    <hr className="m-3" style={{color: '#FFEBEB', borderWidth: '2px'}}/>
                    <div className='row m-0 text-center'>
                        <span className='col '>High score: 1337</span>
                        <span className='col'>Rank: 90135</span>
                    </div>
                    <span>Matches</span>
                    <div className='row m-0 p-2'>
                        <div className='col p-0 px-0' style={{border: '1px solid #505050', borderRadius: '25px'}}>
                            <StepsPrograssBar   colorSet="dark" partialValue={12} totalValue={15} showPrecentage="end"
                                                firstElStyle={{borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'}}
                                                lastElStyle={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px'}}
                            />
                        </div>
                    </div>
                    <span>Tournaments</span>
                    <div className='row m-0 p-2'>
                        <div className='col p-0 px-0' style={{border: '1px solid #505050', borderRadius: '25px'}}>
                            <StepsPrograssBar   colorSet="dark" partialValue={3} totalValue={5} showPrecentage="end"
                                                firstElStyle={{borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'}}
                                                lastElStyle={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px'}}
                            />
                        </div>
                    </div>
                </div>
              </div>
            </div>

        </>
    );
}