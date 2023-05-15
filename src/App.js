import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookingcar from './pages/Bookingcar';
import 'antd/dist/reset.css'

function App() {
  return (
    <div className="App">



      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Bookingcar />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
