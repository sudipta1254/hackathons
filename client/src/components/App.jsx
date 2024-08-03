import React, { useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Main from './Main';
import { BrowserRouter as Route } from 'react-router-dom';
import { getStorage } from '../utils/getStorage';

const App = () => {
  const [user, setUser] = useState(getStorage("user"))
  const [dt1, setDt1] = useState([
    {
      _id: '66adb6536d50b2d114c28de6',
      email: 'abc@gmail.com',
      password: '$2a$10$ymynQIpH0LFWMTFQNT2Sx.00fyzN5t8gjsP2qewG503SxHNtZqTqi',
      createdAt: '2024-08-03T04:47:15.006Z',
      __v: 0
    }
  ])

  return (
    <Route basename="/innovent">
      <Header user={user} setUser={setUser} />
      <Main dt1={dt1} setDt1={setDt1} user={user} setUser={setUser} />
      <Footer />
    </Route>
  );
}
 
export default App;