"use client";
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css';
import NextImage from 'next/image';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import { FormEvent } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import SocialAuth from "../../../components/socialAuth";
import '../../global.css'

export default function SignUp()
{
    const router = useRouter();
    const [qrCode, setQrCode] = useState(null);
    const signUpPost = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const first_name = form.get('first_name') as string;
            const last_name = form.get('last_name') as string;
            const username = form.get('user_name') as string;
            const email = form.get('email') as string;
            const password = form.get('password') as string;
            const response = await fetch('http://localhost:8000/api/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name, last_name, username, email, password }),
              })
            if (response.ok)
            {
                const data = await response.json();
                // console.log(data);
                const {access, refresh} = data;
                toast.success('Successfully signed up !');   
                Cookies.set("access", access)
                Cookies.set("refresh", refresh)
                router.push('/dashboard')
            }
            else if (response.status === 409){
                toast.error('Email or Username already exists !');
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
                            <NextImage fill={true} src='/signimage.png' alt='Sign' className={`${styles.main_img}`} />
                    </div>
                    <div className={`col-lg-6 mb-5`}>
                        <div className={`d-flex align-items-center flex-column`}>
                            <div className={`mt-4 mb-4`}>
                                <h1 className={`text-center valo-font`}>
                                    VAL-PONG
                                </h1>
                            </div>
                            <form className={`form-group mt-3 mb-3 w-75 ${styles.forml}`} onSubmit={signUpPost}>
                                <div className="row form-row">
                                    <div className='col-xs-6 w-50'>
                                        <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='text' autoComplete="off" placeholder='First Name' name="first_name" required/>
                                    </div>
                                    <div className='col-xs-6 w-50'>
                                        <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='text' autoComplete="off" placeholder='last Name' name="last_name" required/>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='text' autoComplete="off" placeholder='User Name' name="user_name" required/>
                                </div>
                                <div className='mb-3'>
                                    <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='email' autoComplete="off" placeholder='Email' name="email" required/>
                                </div>
                                <div className='mb-5'>
                                    <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type='password' autoComplete="off" placeholder='Password' name="password" required/>
                                </div>

                                <div className='mb-3 text-center'>
                                    <button className={`${styles.sign_btn} w-50`} type='submit'>
                                        Sign Up
                                    </button>
                                </div>
                                <div className='row p-2 text-center'>
                                    <Form.Label className='' style={{fontFamily: "itim", color: '#565A69'}}>Already have an account? <Link href="/sign-in" style={{color: '#FF4755', fontFamily: 'itim'}}>sign in</Link></Form.Label>
                                </div>
                                <div className='row text-start mt-3'>
                                    <Form.Label style={{fontFamily: "itim", color: '#565A69'}}>or sign up with :</Form.Label>
                                    <div className='d-flex justify-content-around align-items-center'>
                                        <SocialAuth className={`${styles.auth_btn} col-sm-2`} platform="google" />
                                        <SocialAuth className={`${styles.auth_btn} col-sm-2`} platform="github" />
                                        <SocialAuth className={`${styles.auth_btn} col-sm-2`} platform="42" />
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