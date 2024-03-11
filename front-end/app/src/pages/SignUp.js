
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaGithub , FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";

function SignUp() 
{
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 p-5" style={{backgroundColor: '#111111'}}>
            <div className="container-fluid valo-font  p-5" style={{backgroundColor: '#161625'}}>
                <div className="row justify-content-center align-items-stretch">
                    <div className="col-3  d-flex justify-content-center ">
                        <Image className='' src="assets/char2.png" fluid />    
                    </div>
                    <div className="col-3 p-0  d-flex flex-column justify-content-center align-items-center">
                        <h1>VAL-PONG</h1>
                        <div>
                            <div className="container-fluid d-flex ">
                                <Form.Control className="m-4 mb-0" placeholder='first name' data-bs-theme="dark" size='lg' style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                                <Form.Control className="m-4 mb-0" placeholder='last name' data-bs-theme="dark" size='lg' style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/>
                            </div>
                            <div className="container-fluid ">
                                <div className="m-4"><Form.Control className="" type='text' placeholder='nickname' data-bs-theme="dark" size='lg' style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/></div>
                                <div className='m-4'><Form.Control className="" placeholder='email' data-bs-theme="dark" size='lg' style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/></div>
                                <div className='m-4'><Form.Control className="" placeholder='password' data-bs-theme="dark" size='lg' style={{fontFamily: "itim", backgroundColor: '#2C3143'}}/></div>
                            </div>
                        </div>
                        <div className=' d-flex flex-column align-items-center m-2'>
                            <Button className='col-7 m-2 p-3' variant="flat" size="xxl" style={{backgroundColor: '#FF4755', borderRadius: '10%'}}>SIGN UP</Button>
                            <Form.Label className='' style={{fontFamily: "itim"}}>Already have an account? <a href='/'>sign in</a></Form.Label>
                        </div>
                        <div className='container-fluid p-5'>
                            <Form.Label style={{fontFamily: "itim"}}>or sign up with :</Form.Label>
                            <div className='d-flex justify-content-evenly'>
                                <Button className='' variant="flat" size="xxl" style={{backgroundColor: '#161625', border: "1px solid #2C3143" }}><FaGithub color='#FFEBEB'/></Button>
                                <Button className='' variant="flat" size="xxl" style={{backgroundColor: '#161625', border: "1px solid #2C3143" }}><FaGoogle color='#FFEBEB'/></Button>
                                <Button className='' variant="flat" size="xxl" style={{backgroundColor: '#161625', border: "1px solid #2C3143" }}><Si42 color='#FFEBEB'/></Button>
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
