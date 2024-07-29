import React, { useEffect, useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Main from './Main';
import { BrowserRouter as Route } from 'react-router-dom';
import { getStorage } from '../utils/getStorage';

const App = () => {
  const [user, setUser] = useState(getStorage("user"))
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    return () => {

    }
  })

  return (
    <Route>
      <Header user={user} setUser={setUser} />
      <Main user={user} setUser={setUser}
        remember={remember} setRemember={setRemember}
      />
      <Footer />
    </Route>
  );
}
 
export default App;