import './App.css';
import React, { useState } from 'react';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { logomain } from './assets';
import lg from './assets/lg.png';
import Gallery from './components/Gallery/Gallery';
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
  return (
    <Router>
      <header className="w-full h-16 flex justify-between items-center absolute bg-[#fecb146a] sm:px-8 px-4 py-4 border-b border-b-[#d9f74561]">
        <div className="flex-col justify-center items-baseline">
          <div className='flex justify-evenly'>
            <img src={logomain} alt="logo" className="w-7 m-2 pt-1 object-contain" />
            <img src={lg} alt="logo" className="w-40 object-contain pt-2h-10" />
          </div>

          <div className="text-[#202869]  pb-3">
            Frame Your Imagination
          </div>
        </div>

        <div>
          {(localStorage.getItem('auth-token') != null) ? <button id='signin' onClick={handleLogout}>Log Out</button> : <></>}
        </div>
      </header>

      <main>
        {
          (localStorage.getItem('auth-token') == null) ? <div className="log-cont">
            {
              currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
          </div> : <Gallery />
        }

      </main>

    </Router>

  );
}

export default App;
