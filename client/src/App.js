import './stylesheets/App.css';
import Login from './pages/login'; // Adjusted component name and import path
import Survey from './pages/survey';
import MainPage from './pages/mainpage'; // Adjusted component name and import path
import Window1 from './pages/window1';
import Window2 from './pages/window2'; // Import Window2 component
import Window3 from './pages/window3'; // Import Window3 component
import Window4 from './pages/window4'; // Import Window3 component

import { Routes, Route } from "react-router-dom";
import ChatButton from './pages/chatbutton';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/window1" element={<Window1 />} /> {/* Route to Window1 component */}
          <Route path="/window2" element={<Window2 />} /> {/* Route to Window2 component */}
          <Route path="/window3" element={<Window3 />} /> {/* Route to Window3 component */}
          <Route path="/window4" element={<Window4 />} /> {/* Route to Window3 component */}
          <Route path="/survey" element={<Survey />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
    </div>
  );
}

export default App;
