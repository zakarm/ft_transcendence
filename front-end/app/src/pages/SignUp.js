
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

function SignUp() 
{
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#111111'}}>
            <div className="container-fluid valo-font border" style={{backgroundColor: '#161625'}}>
                <div className="row justify-content-center align-items-stretch">
                    <div className="col-5 border">
                        <Image src="assets/char2.png" fluid />    
                    </div>
                    <div className="col-5 border">
                        <h1>VAL-PONG</h1>
                        <Form.Control className="" placeholder='first name' data-bs-theme="dark"/>
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
