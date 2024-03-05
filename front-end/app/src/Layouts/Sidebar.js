
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/game">Game</Link></li>
      </ul>
    </div>
  );
}

export default SideBar;
