'use client';
import styles from './styles.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import SocialAuth from '../../../components/socialAuth';
import TwoFa from '../../../components/twoFa';

export default function SignInPage() {
  const router = useRouter();
  const [twoFaData, setTwoFaData] = useState<{ value: string; email: string }>();

  const signInPost = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      const csrftoken = Cookies.get('csrftoken') || '';
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const { access, refresh, is_2fa_enabled, email } = data;
        if (is_2fa_enabled == 'True') {
          const { url_code } = data;
          setTwoFaData({ value: url_code, email });
        } else {
          toast.success('Successfully signed in !');
          Cookies.set('access', access, { path: '/' });
          Cookies.set('refresh', refresh, { path: '/' });
          router.push('/dashboard');
        }
      } else {
        const errors = data;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            errors[key].forEach((errorMessage: string) => {
              toast.error(`${key}: ${errorMessage}`);
            });
          }
        }
      }
    } catch (error) {
      // console.error('No response received from server.');
    }
  };
  return (
    <div className={`container`}>
      {twoFaData && <TwoFa value={twoFaData.value} email={twoFaData.email} qr={false} />}
      <div className={`${styles.flexx}`}>
        <div className={`${styles.main_card} shadow row`}>
          <div className={`col-lg-6 ${styles.main_img}`} style={{ position: 'relative', minHeight: '400px' }}>
            <img
              loading="eager"
              src="/assets/images/Backgrounds/pong_background.png"
              alt="Sign"
              className={`${styles.main_img}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            />
          </div>
          <div className={`col-lg-6 mb-5`}>
            <div className={`d-flex align-items-center flex-column`}>
              <div className={`mt-4 mb-4`}>
                <h1 className={`text-center valo-font`}>VAL-PONG</h1>
              </div>
              <form className={`form-group mt-3 mb-3 w-75 ${styles.forml}`} onSubmit={signInPost}>
                <div className="mb-3">
                  <input
                    className={`form-control ${styles.input_class} p-3 mb-3 border-0`}
                    type="email"
                    autoComplete="off"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    className={`form-control ${styles.input_class} p-3 mb-3 border-0`}
                    type="password"
                    autoComplete="off"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>

                <div className="mb-3 text-center">
                  <button className={`${styles.sign_btn} w-50`} type="submit">
                    Sign In
                  </button>
                </div>
                <div className="row p-2 text-center">
                  <div className="" style={{ fontFamily: 'itim', color: '#565A69' }}>
                    Don't have an account?{' '}
                    <Link href="/sign-up" style={{ color: '#FF4755', fontFamily: 'itim' }}>
                      sign up
                    </Link>
                  </div>
                </div>
                <div className="row text-start mt-3">
                  <div style={{ fontFamily: 'itim', color: '#565A69' }}>or sign in with :</div>
                  <div className="d-flex justify-content-around align-items-center">
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
