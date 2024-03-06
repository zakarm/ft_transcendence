
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Chat from "./pages/Chat";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import SideBar from "./Layouts/Sidebar";

function App() {
  return (
    <div class="container-fluid vh-100" style={{backgroundColor: '#000000'}}>
      <div class="row vh-100 border">
        <Router>
          <div class="col-1 rounded-5 rounded-start-0" style={{backgroundColor: '#161625'}}>
            <SideBar />
          </div>
          <div class="col-9">
            <Routes>
              <Route path='/'         element={<Home />}      />
              <Route path='/chat'     element={<Chat />}      />
              <Route path='/settings' element={<Settings />}  />
              <Route path='/game'     element={<Game />}      />
            </Routes>
          </div>
          <div class="col-2 border border-warning">
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
