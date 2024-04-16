
import styles from './style.module.css';
import Image from 'next/image';

export default function ()
{
    return (
        <>
        <div className={`${styles.container} vh-100 border`}>
            <div className={`${styles.bg_holder} vh-100`}></div>
                <div className={`${styles.holder} vh-100`}>
                    <div className='text-center'>
                        <Image className={`${styles.profile_img}`} width={60} height={60} src="/char3.png" alt='Profile'/>
                        <div className='row m-0 p-0'>
                            <div className='col-5 border'>
                                <div className={`${styles.info} d-flex border`}>
                                    <div className={`col d-flex flex-column`}>
                                        <h4>Total game</h4>
                                        <span>613</span>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <h4>Win</h4>
                                        <span>85%</span>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <h4>Lose</h4>
                                        <span>15%</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 border'>
                                <h1 className='valo-font' style={{color: '#FFEBEB'}}>!SNAKE_007</h1>
                                <div className={`${styles.action} d-flex`}>
                                    <div className={`col ${styles.btn}`}><button>Message</button></div>
                                    <div className={`col ${styles.btn}`}><button>+ invite</button></div>
                                </div>
                            </div>
                            <div className='col-5 border'>
                                <div className='d-flex'>
                                    <div className='col d-flex flex-column'>
                                        <span>Total game</span>
                                        <span>613</span>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <span>Win</span>
                                        <span>85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="dropdown-divider" />
                    <div>
                        down
                    </div>
                </div>
        </div>
        </>
    );
}