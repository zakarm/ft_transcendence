import styles from './style.module.css'
import Image from 'next/image';
import { FaHistory } from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import GameHistoryCard from '../../components/table';
import ButtonValo from '../../components/button'

export default function Dashboard() {
    return (
        <div className={`container-fluid ${styles.page_body} vh-100`}>
            <div className="row m-0">
                <div className="col-12 mt-5">
                    <div className={`row ${styles.card} m-1`}>
                        <div className='col-12 col-md-6'>
                            <div className={`${styles.index_img}`}>
                                <div className={`row`}>
                                    <small className={`itim-font ${styles.small_title}`}>upcoming</small>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-8`}>
                                        <h1 className={`${styles.titles} valo-font`}>THE ULTIMATE PING-PONG GAME</h1>
                                    </div>
                                </div>
                                <div className={`row`}>
                                    <div className={`col-12 col-md-12`}>
                                        <h6 className={`${styles.med_titles} itim-font`}>Welcome to our online ping pong paradise! Dive into
                                            the fast-paced  world of table tennis with our website,
                                            where players of all levels can  connect, compete,
                                            and improve their skills. From casual matches to intense
                                            tournaments, we've got everything you need to serve up some
                                            excitement!
                                        </h6>
                                    </div>
                                    <div>
                                        <ButtonValo value="Play" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className={`${styles.imageContainer} position-relative`}>
                                <Image src="/dashboard_char.png" width={350} height={350} alt="anime charachter" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className={`row p-3 ${styles.card} ${styles.buttom_cards} m-1`}>
                                <div className='col-6 d-flex align-items-start justify-content-start'>
                                    <p className={`itim-font ${styles.med_titles}`}><FaHistory color='FFEBEB'/> GAME HISTORY</p>
                                </div>
                                <div className='col-6 d-flex align-items-end justify-content-end'>
                                    <p className={`itim-font ${styles.all_down}`}>ALL <FaChevronDown color='FFEBEB'/></p>
                                </div>
                                <hr style={{color: '#FFEBEB', backgroundColor: '#FFEBEB', height: 1}}/>
                                <GameHistoryCard/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`row p-3 ${styles.card} ${styles.buttom_cards} m-1`}>
                                <div className='col-6 d-flex align-items-start justify-content-start'>
                                    <p className={`itim-font ${styles.med_titles}`}><BiStats color='FFEBEB'/> MY GAME STATS</p>
                                </div>
                                <div className='col-6 d-flex align-items-end justify-content-end'>
                                    <p className={`itim-font ${styles.all_down}`}>ALL <FaChevronDown color='FFEBEB'/></p>
                                </div>
                                <hr style={{color: '#FFEBEB', backgroundColor: '#FFEBEB', height: 1}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}