
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { FaGithub , FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";
import './SignUp.css'

function SignUp() 
{
    return (
        <div className="container" style={{backgroundColor: '#111111'}}>
            <div className="conatiner p-2" style={{backgroundColor: '#161625'}}>
                <div className="row">
                    <div className="col ">
                        <Image className='' src="assets/char2.png" fluid />    
                    </div>
                    <div className="col   align-self-center text-center">
                        <div className='row '><h1 className='valo-font'>VAL-PONG</h1></div>
                        <div>
                            <div className="row  mb-3">
                                <Form.Control className="col p-3 m-2 mb-0" placeholder='first name' data-bs-theme="dark" style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                                <Form.Control className="col p-3 m-2 mb-0" placeholder='last name' data-bs-theme="dark" style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                            </div>
                            <div className="row  p-2 pt-0">
                                <input className="form-control p-3 mb-3" type='text' placeholder='nickname' data-bs-theme="dark" style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                                <input className="form-control p-3 mb-3" type='text' placeholder='email' data-bs-theme="dark" style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                                <input className="form-control p-3 mb-3" type='text' placeholder='password' data-bs-theme="dark" style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                            </div>
                        </div>
                        <div className='row  p-2 d-flex justify-content-center'>
                            <button className='sign-btn col-md-3 btn-lg m-2 p-3' type='button' >SIGN UP</button>
                            <Form.Label className='' style={{fontFamily: "itim", color: '#565A69'}}>Already have an account? <a href="/home" style={{color: '#FF4755', fontFamily: 'itim'}}>sign in</a></Form.Label>
                        </div>
                        <div className='row text-start '>
                            <Form.Label style={{fontFamily: "itim"}}>or sign up with :</Form.Label>
                            <div className='d-flex justify-content-around align-items-center'>
                                <button className='auth-btn ' type='button' ><FaGithub color='#FFEBEB'/></button>
                                <button className='auth-btn ' type='button' ><FaGoogle color='#FFEBEB'/></button>
                                <button className='auth-btn ' type='button' ><Si42 color='#FFEBEB'/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

// import Image from 'react-bootstrap/Image';

// function SignUp() {
//     return (
//         <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#111111'}}>
//             <div className="container-fluid valo-font border" style={{backgroundColor: '#161625'}}>
//                 <div className="row justify-content-center align-items-stretch"> {/* Changed align-items-center to align-items-stretch */}
//                     <div className="col-5 border">
//                         <Image src="assets/char2.png" fluid />    
//                     </div>
//                     <div className="col-5 border d-flex flex-column"> {/* Added d-flex and flex-column classes */}
//                         <div className="flex-grow-1"> {/* Added flex-grow-1 class */}
//                             world
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SignUp;
