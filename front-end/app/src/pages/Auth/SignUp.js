
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { FaGithub , FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";
import './SignUp.css'

function SignUp() 
{
    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{backgroundColor: '#111111'}}>
            <div className="main-class conatiner d-inline-flex p-5">
                <div className="row">
                    <div className="col-md-6">
                        <Image className='' src="assets/char2.png" fluid />    
                    </div>
                    <div className="col-md-6 align-self-center text-center">
                        <div className='row '><h1 className='valo-font'>VAL-PONG</h1></div>
                        <div className='mt-4'>
                            <div className="row  mb-3">
                                <input className='input-class col p-3 m-2 mb-0 border-0' placeholder='first name' />
                                <input className='input-class col p-3 m-2 mb-0 border-0' placeholder='last name' data-bs-theme="dark"/>
                            </div>
                            <div className="row  p-2 pt-0">
                                <input className="input-class p-3 mb-3 border-0" type='text' placeholder='nickname' data-bs-theme="dark"/>
                                <input className="input-class p-3 mb-3 border-0" type='text' placeholder='email' data-bs-theme="dark"/>
                                <input className="input-class p-3 mb-3 border-0" type='text' placeholder='password' data-bs-theme="dark"/>
                            </div>
                        </div>
                        <div className='row  p-2 d-flex justify-content-center'>
                            <button className='sign-btn col-md-3 m-2 ' type='button' >SIGN UP</button>
                            <Form.Label className='' style={{fontFamily: "itim", color: '#565A69'}}>Already have an account? <a href="/home" style={{color: '#FF4755', fontFamily: 'itim'}}>sign in</a></Form.Label>
                        </div>
                        <div className='row text-start '>
                            <Form.Label style={{fontFamily: "itim", color: '#565A69'}}>or sign up with :</Form.Label>
                            <div className='d-flex justify-content-around align-items-center'>
                                <button className='auth-btn border col-md-2 btn-lg m-2 p-3' type='button' ><FaGithub color='#FFEBEB'/></button>
                                <button className='auth-btn border col-md-2 btn-lg m-2 p-3' type='button' ><FaGoogle color='#FFEBEB'/></button>
                                <button className='auth-btn border col-md-2 btn-lg m-2 p-3' type='button' ><Si42 color='#FFEBEB'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
