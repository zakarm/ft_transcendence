import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'react-qr-code';
import OtpInput from 'react-otp-input';
import { TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled } from 'react-icons/tb';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

interface QrCode {
  value?: string;
  email?: string;
}

export default function TwoFa({ value = '', email }: QrCode) {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (otp && otp.length === 6) {
          const response = await fetch('http://localhost:8000/api/two-fa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
          });

          if (response.ok) {
            const data = await response.json();
            const { access, refresh } = data;
            toast.success('Successfully signed in!');
            Cookies.set('access', access);
            Cookies.set('refresh', refresh);
            router.push('/dashboard');
          } else if (response.status === 401) {
            toast.error('Invalid otp!');
          } else if (response.status === 500) {
            toast.error('Server error!');
          }
        }
      } catch (error) {
        console.error('An unexpected error happened:', error);
      }
    };

    fetchData();
  }, [otp, email, router]);

  return (
    <div
      className="modal show"
      style={{
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* <ToastContainer /> */}
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Two Factor Authentication</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#161625' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCode value={value || ''} style={{ border: '3px' }} className="border border-danger" />
          </div>
          <div className="mt-4 mb-4">
            <p className="mt-2">
              <TbSquareRoundedNumber1Filled size={30} color="white" />
              <span style={{ color: 'white' }}> Scan the QR code using any authentication application on your phone (e.g. Google Authenticator, Duo Mobile, Authy).</span>
            </p>
            <p className="mt-2">
              <TbSquareRoundedNumber2Filled size={30} color="white" />
              <span style={{ color: 'white' }}> Enter the 6-digit confirmation code shown on the app:</span>
            </p>
          </div>
          <div className="mt-2 mb-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>&nbsp;&nbsp;</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: '50px', height: '60px', borderRadius: '6px', border: '0px', color: '#FF4755', backgroundColor: '#2C3143' }}
            />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
