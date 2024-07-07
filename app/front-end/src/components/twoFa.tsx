import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'react-qr-code';
import OtpInput from 'react-otp-input';
import { TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled, TbSquareRoundedNumber3Filled } from 'react-icons/tb';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

interface QrCode {
    value?: string;
    email?: string;
    qr: boolean;
    setPassOTP ?: Dispatch<SetStateAction<boolean>>
}

export default function TwoFa({ value = '', email, qr, setPassOTP=()=>{} }: QrCode) {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (otp && otp.length === 6) {
                    const csrftoken = Cookies.get('csrftoken') || '';
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/two-fa`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                        body: JSON.stringify({ email, otp }),
                    });

                    if (response.ok) {
                        if (!qr){
                            const data = await response.json();
                            const { access, refresh } = data;
                            toast.success('Successfully signed in!');
                            Cookies.set('access', access);
                            Cookies.set('refresh', refresh);
                            router.push('/dashboard');
                        }
                        else {
                            setPassOTP(true)
                            toast.success('Save changes to enable 2fa !');
                            setShowModal(false);
                        }
                    } else {
                        toast.error('Failed to set up otp')
                    }
                }
            } catch (error) {
                console.error(`Error : ${error}`);
            }
        };

        fetchData();
    }, [otp, email, router]);

    const handleClose = () => {setShowModal(false); setPassOTP(false)};

    return (
        <>
            {showModal && (
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
                    <Modal.Dialog>
                        <Modal.Header style={{ backgroundColor: '#feebeb' }}>
                            <Modal.Title style={{ color: '#111111' }}>Two Factor Authentication</Modal.Title>
                            {qr === true ? <Button variant="close" onClick={handleClose}></Button> : null}
                        </Modal.Header>

                        <Modal.Body style={{ backgroundColor: '#161625' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {qr === true ? (
                                    <QRCode
                                        value={value || ''}
                                        style={{ border: '3px' }}
                                        className="border border-danger"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-4 mb-4">
                                {qr === true ? (
                                    <p className="mt-2">
                                        <TbSquareRoundedNumber1Filled size={30} color="#feebeb" />
                                        <span style={{ color: '#feebeb' }}>
                                            {' '}
                                            Scan the QR code using any authentication application on your phone (e.g.
                                            Google Authenticator, Duo Mobile, Authy).
                                        </span>
                                    </p>
                                ) : null}
                                {/* {qr === true ?
                            <p className="mt-2">
                                <TbSquareRoundedNumber2Filled size={30} color="#feebeb" />
                                <span style={{ color: '#feebeb' }}>
                                    {' '}
                                    Is mandatory to scan your QR code if you see this message on your screen.
                                </span>
                            </p>
                        : null} */}

                                <p className="mt-2">
                                    <TbSquareRoundedNumber2Filled size={30} color="#feebeb" />
                                    <span style={{ color: '#feebeb' }}>
                                        {' '}
                                        Enter the 6-digit confirmation code shown on the app:
                                    </span>
                                </p>
                            </div>
                            <div
                                className="mt-2 mb-5"
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>&nbsp;&nbsp;</span>}
                                    renderInput={(props, index) => <input {...props} id={`otp-input-${index}`} />}
                                    inputStyle={{
                                        width: '50px',
                                        height: '60px',
                                        borderRadius: '6px',
                                        border: '0px',
                                        color: '#FF4755',
                                        backgroundColor: '#2C3143',
                                    }}
                                />
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </div>
            )}
        </>
    );
}
