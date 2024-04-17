
import styles from './style.module.css';
import Image from 'next/image';
import { SlUser } from "react-icons/sl";
import { GrFlag } from "react-icons/gr";

export default function ()
{
    return (
        <>
        <div className={`${styles.container} vh-100 border  `}>
            <div className={`${styles.bg_holder} vh-100`}></div>
                <div className={`${styles.holder} vh-100`}>
                    <div className='text-center'>
                        <div className='row m-0 p-0'>
                            <div className='col-5 border'>
                                <div className={`${styles.info} d-flex border`}>
                                    <div className='col d-flex flex-column justify-content-end pb-5'>
                                        <h4>Total game</h4>
                                        <span>613</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end pb-5'>
                                        <h4 style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>Win</h4>
                                        <span style={{borderLeft: '1px solid #61627C', borderRight: '1px solid #61627C'}}>85%</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end pb-5'>
                                        <h4>Lose</h4>
                                        <span>15%</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 border'>
                                <Image className={`${styles.profile_img}`} width={60} height={60} src="/char3.png" alt='Profile'/>
                                <h1 className='valo-font' style={{color: '#FFEBEB'}}>!SNAKE_007</h1>
                                <div className={`${styles.action} d-flex`}>
                                    <div className={`col ${styles.btn}`}><button>Message</button></div>
                                    <div className={`col ${styles.btn}`}><button>+ invite</button></div>
                                </div>
                            </div> 
                            <div className='col-4 border'>
                                <div className={`${styles.info} d-flex border`}>
                                    <div className='col d-flex flex-column justify-content-end p-5'>
                                        <div><SlUser size='1.9em' color='#FFEBEB'/></div>
                                        <span>Othman Nouakchi</span>
                                    </div>
                                    <div className='col d-flex flex-column justify-content-end p-5'>
                                        <div><GrFlag size='1.9em' color='#FFEBEB'/></div>
                                        <span>Morroco / Casablanca  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" style={{color: '#61627C', borderWidth: '2px'}}/>
                    <div>
                        down
                    </div>
                </div>
        </div>
        </>
    );
}