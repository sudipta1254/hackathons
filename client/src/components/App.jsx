import React, { useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Main from './Main';
import { BrowserRouter as Route } from 'react-router-dom';
import { getStorage } from '../utils/getStorage';

const App = () => {
  const [user, setUser] = useState(getStorage("innovent-user"))
  const [dt1, setDt1] = useState([])

  return (
    <Route>
      <Header user={user} setUser={setUser} />
      <Main dt1={dt1} setDt1={setDt1} user={user} setUser={setUser} />
      <Footer />
    </Route>
  );
}
 
export default App;