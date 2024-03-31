import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'react-qr-code';
import AuthCode from 'react-auth-code-input';
import DefaultInput from './defaultInput';
import OtpInput from 'react-otp-input';
import React, { useState } from 'react';
import { TbSquareRoundedNumber1Filled , TbSquareRoundedNumber2Filled} from "react-icons/tb";

interface QrCode {
		value?: string;
}

export default function TwoFa({value} : QrCode) {
	const [otp, setOtp] = useState('');
		return (
			<div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' , backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Two Factor Autentication</Modal.Title>
					</Modal.Header>
	
					<Modal.Body style={{backgroundColor: '#161625'}}>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<QRCode style={{border : '3px'}} value={value} />
						</div>
						<div className='mt-4 mb-4'>
							<p className='mt-2'>
								<TbSquareRoundedNumber1Filled size={30} color='white' />
								<span style={{color: 'white'}}> Scan the QR code using any autentication application on you phone (e.g. Google Autenticator, Duo Mobile, Authy).</span>			
							</p>
							<p className='mt-2'>
								<TbSquareRoundedNumber2Filled size={30} color='white' />
								<span style={{color: 'white'}}> Enter the 6 figure confirmation code shown on the app :</span>
							</p>
						</div>
						<div className='mt-2 mb-5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
							<OtpInput 
								value={otp} 
								onChange={setOtp}
								numInputs={6}
								renderSeparator={<span>&nbsp;&nbsp;</span>}
								renderInput={(props) => <input {...props} />}
								inputStyle={{ width: '50px', height: '60px' , borderRadius: '6px', border: '0px', color: '#FF4755', backgroundColor: '#2C3143'}}
							/>
						</div>
						
					</Modal.Body>
	
					{/* <Modal.Footer>
						<Button variant="secondary">Close</Button>
						<Button variant="primary">Send</Button>
					</Modal.Footer> */}
				</Modal.Dialog>
			</div>
		);
}