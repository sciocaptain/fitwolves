import './stylesheets/App.css';
import Login from './pages/login'; // Adjusted component name and import path
import MainPage from './pages/mainpage'; // Adjusted component name and import path
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Login />
      <MainPage />

      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
    </div>
  );
}

export default App;
