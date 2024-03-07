
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Chat from "./pages/Chat";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Achievement from './pages/Achievement';
import SideBar from "./Layouts/Sidebar";

function App() {
  return (
    <div className="container-fluid vh-100" style={{backgroundColor: '#000000'}}>
      <div className="row">
        <Router >
          <div className="col-md-1" style={{backgroundColor: '#000000'}}>
            <SideBar />
          </div>
          <div className="col-md-9" style={{backgroundColor: '#000000'}}>
            <Routes>
              <Route path='/'         element={<Home />}      />
              <Route path='/chat'     element={<Chat />}      />
              <Route path='/settings' element={<Settings />}  />
              <Route path='/game'     element={<Game />}      />
              <Route path='/achievement'     element={<Achievement />}      />
            </Routes>
          </div>
          <div className="col-md-2" style={{backgroundColor: '#161625'}}>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
