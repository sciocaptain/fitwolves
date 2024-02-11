import './stylesheets/App.css';
import Login from './pages/login'; // Adjusted component name and import path
import Survey from './pages/survey';
import MainPage from './pages/mainpage'; // Adjusted component name and import path
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
    </div>
  );
}

export default App;
