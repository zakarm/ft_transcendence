
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp() 
{
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#111111'}}>
            <div className="container-fluid valo-font border" style={{backgroundColor: '#161625'}}>
                <div className="row justify-content-center align-items-stretch">
                    <div className="col-5 border">
                        <Image src="assets/char2.png" fluid />    
                    </div>
                    <div className="col-5 p-0 border">
                        <h1>VAL-PONG</h1>
                        <div className="d-flex">
                            <Form.Control className="m-4 mb-0" placeholder='first name' data-bs-theme="dark" size='lg'/>
                            <Form.Control className="m-4 mb-0" placeholder='last name' data-bs-theme="dark" size='lg'/>
                        </div>
                        <div className="">
                            <div className="m-4"><Form.Control className="" type='text' placeholder='nickname' data-bs-theme="dark" size='lg'/></div>
                            <div className='m-4'><Form.Control className="" placeholder='email' data-bs-theme="dark" size='lg'/></div>
                            <div className='m-4'><Form.Control className="" placeholder='password' data-bs-theme="dark" size='lg'/></div>
                        </div>
                        <Button variant="flat" size="xxl" style={{backgroundColor: '#FF4755'}}>
                            flat button
                        </Button>
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
