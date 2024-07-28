import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Chatbot from './genAI/Chatbot';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Login from "./Login"
import Signup from "./Signup"
import Home from './Home';
import "../index.css"

const Main = () => {
   return (
      <div className="Main">
         <div className='container'>
            <Routes>
               <Route path="/" element={ <Home /> } />
               <Route path="/login" element={ <Login /> } />
               <Route path="/singup" element={ <Signup /> } />
               <Route path="/chatbot" element={ <Chatbot /> } />
               <Route path="/dashboard" element={ <Dashboard /> } />
               <Route path="*" element={ <NotFound /> } />
            </Routes>
         </div>
      </div>
   );
};

export default Main;
