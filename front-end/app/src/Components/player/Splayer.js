import Dropdown from 'react-bootstrap/Dropdown';
import './Splayer.css'

function Player({ nickname , id , image , isConnected }) {

    const CustomToggle = ({children, onClick}) => (
        <div onClick={onClick}>
          {children}
        </div>
    );

    return (
        <div className="usr-class1 row-inline">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <img className="img-usr-class1" src={image} alt='Profile' 
                        style={
                                {
                                    border: isConnected ? "3px solid #27B299" : "3px solid #7E7E8D",
                                    filter: isConnected ? '' : "grayscale(100%)"
                                }
                    }/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="drop-class">
                      <Dropdown.Item eventKey="1">opt 1</Dropdown.Item>
                      <hr className="dropdown-divider" />
                      <Dropdown.Item eventKey="2">opt 2</Dropdown.Item>
                      <hr className="dropdown-divider" />
                      <Dropdown.Item eventKey="3">opt 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className=" p-2">
                    <h5 style={{fontFamily: 'intim', color: '#FFEBEB'}}>{nickname}</h5>
                </div>
            </div>
        </div>
    );
}

export default Player;
