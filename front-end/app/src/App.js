
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Chat from "./pages/Chat";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import SideBar from "./Layouts/Sidebar";

function App() {
  return (
    <div class="container">
      <div class="row">
        <Router>
          <div class="col-2">
            <SideBar />
          </div>
          <div class="col-8">
            <Routes>
              <Route path='/'         element={<Home />}      />
              <Route path='/chat'     element={<Chat />}      />
              <Route path='/settings' element={<Settings />}  />
              <Route path='/game'     element={<Game />}      />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
