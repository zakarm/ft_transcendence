import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { FaGithub , FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";
import styles from './styles.module.css';

export default function SignInPage() {
    return (
        <div className={`${styles.section_pad}`}>
            <div className={`${styles.global_class} conatiner` }>
                <div className={`row justify-content-center`}>
                    <div className='col-md-12 col-lg-10'>
                        <div className={`${styles.main_class} ${styles.wrap} d-md-flex`}>
                            <div className={`${styles.img}`}></div>
                            <div className={`${styles.login_wrap} p-4 p-md-5`}>
                                <form>
                                    <div className='p-5 text-center'><h1 className='valo-font'>VAL-PONG</h1></div>
                                    <div className='form-group mb-3'>
                                        <input className={`${styles.input_class} form-control border-0`} type='email' placeholder='email' data-bs-theme="dark"/>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input className={`${styles.input_class} form-control border-0`} type='password' placeholder='password' data-bs-theme="dark"/>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button className={`${styles.sign_btn} form-control mt-3 mb-2`} type='button' >SIGN IN</button>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <Form.Label className='pb-4' style={{fontFamily: "itim", color: '#565A69'}}>Don't have an account? <a href="/home" style={{color: '#FF4755', fontFamily: 'itim'}}>sign up</a></Form.Label>
                                    </div>
                                    <div className='row text-start'>
                                        <Form.Label style={{fontFamily: "itim", color: '#565A69'}}>or sign in with :</Form.Label>
                                        <div className='d-flex justify-content-around align-items-center'>
                                            <button className={`${styles.auth_btn} col-md-2 m-1 `} type='button' ><FaGithub color='#FFEBEB'/></button>
                                            <button className={`${styles.auth_btn} col-md-2 m-1 `} type='button' ><FaGoogle color='#FFEBEB'/></button>
                                            <button className={`${styles.auth_btn} col-md-2 m-1`} type='button' ><Si42 color='#FFEBEB'/></button>
                                        </div>
                                    </div>

                                </form>


                                {/* <div className='row '><h1 className='valo-font'>VAL-PONG</h1></div>
                                <div className='mt-4'>
                                    <div className="row p-2">
                                        <input className={`${styles.input_class} p-3 mb-3 border-0`} type='email' placeholder='email' data-bs-theme="dark"/>
                                        <input className={`${styles.input_class} p-3 mb-3 border-0`} type='password' placeholder='password' data-bs-theme="dark"/>
                                    </div>
                                </div>
                                <div className='row p-2 d-flex justify-content-center'>
                                    <button className={`${styles.sign_btn} col-md-4 m-2 `} type='button' >SIGN IN</button>
                                    <Form.Label className='' style={{fontFamily: "itim", color: '#565A69'}}>Don't have an account? <a href="/home" style={{color: '#FF4755', fontFamily: 'itim'}}>sign up</a></Form.Label>
                                </div>
                                <div className='row text-start'>
                                    <Form.Label style={{fontFamily: "itim", color: '#565A69'}}>or sign in with :</Form.Label>
                                    <div className='d-flex justify-content-around align-items-center'>
                                        <button className={`${styles.auth_btn} col-md-2 m-2 p-3`} type='button' ><FaGithub color='#FFEBEB'/></button>
                                        <button className={`${styles.auth_btn} col-md-2 m-2 p-3`} type='button' ><FaGoogle color='#FFEBEB'/></button>
                                        <button className={`${styles.auth_btn} col-md-2 m-2 p-3`} type='button' ><Si42 color='#FFEBEB'/></button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}