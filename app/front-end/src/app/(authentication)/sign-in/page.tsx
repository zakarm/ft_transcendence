"use client";
import Form from 'react-bootstrap/Form';
import { FaGithub , FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";
import styles from './styles.module.css';
import NextImage from 'next/image';
import React from 'react';
import {useRouter} from 'next/navigation';
import { FormEvent } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignInPage() {
    const router = useRouter();
    const signInPost = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const email = form.get('email') as string;
            const password = form.get('password') as string;
            const response = await fetch('http://localhost:8000/api/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
              })
            console.log(response);
            if (response.ok)
            {
                const data = await response.json();
                console.log(data);
                const {accessToken, refreshToken} = data;
                Cookies.set("accessToken", accessToken)
                Cookies.set("refreshToken", refreshToken)
                toast.success('Successfully signed in !');
                console.log(response);
                router.push('/')
            }
            else if (response.status === 401){
                toast.error('Invalid email or password !');
            }
            else if (response.status === 500){
                toast.error('Server error !');
            }
        }
        catch (error) {
            console.error('An unexpected error happened:', error);
        }
    }
    return (
        <div className='container'>
            <ToastContainer />
            <div className={`${styles.flexx}`}>
                <div className={`${styles.main_card} shadow row`}>
                    <div className={`col-lg-6 ${styles.main_img}`} style={{position: 'relative', minHeight: '300px'}}>
                            <NextImage layout="fill" src='/signimage.png' alt='Sign' className={`${styles.main_img}`} />
                    </div>
                    <div className={`col-lg-6 mb-5`}>
                        <div className={`d-flex align-items-center flex-column`}>
                            <div className={`mt-4 mb-4`}>
                                <h1 className={`text-center valo-font`}>
                                    VAL-PONG
                                </h1>
                            </div>
                            <form className={`form-group mt-3 mb-3 w-75`} onSubmit={signInPost}>
                                <div className='mb-3'>
                                    <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='email' placeholder='Email' name="email" required/>
                                </div>
                                <div className='mb-5'>
                                    <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='password' placeholder='Password' name="password" required/>
                                </div>

                                <div className='mb-3 text-center'>
                                    <button className={`${styles.sign_btn} w-50`} type='submit'>
                                        Sign In
                                    </button>
                                </div>
                                <div className='row p-2 text-center'>
                                    <Form.Label className='' style={{fontFamily: "itim", color: '#565A69'}}>Already have an account? <a href="/home" style={{color: '#FF4755', fontFamily: 'itim'}}>sign in</a></Form.Label>
                                </div>
                                <div className='row text-start mt-3'>
                                    <Form.Label style={{fontFamily: "itim", color: '#565A69'}}>or sign up with :</Form.Label>
                                    <div className='d-flex justify-content-around align-items-center'>
                                        <button className={`${styles.auth_btn} col-sm-2`} type='button' ><Si42 color='#FFEBEB'/></button>
                                        <button className={`${styles.auth_btn} col-sm-2`}  type='button' ><FaGithub color='#FFEBEB'/></button>
                                        <button className={`${styles.auth_btn} col-sm-2`}  type='button' ><FaGoogle color='#FFEBEB'/></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}