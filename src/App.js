import StartPage from './StartPage'
import  Login  from './Login'
import Signup from './Signup';
import  Home  from './Home';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={<StartPage />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Signup />} />
        <Route path = "/home" element = {<Home />} />
      </Routes>
    </div>
  );
}

export default App;
