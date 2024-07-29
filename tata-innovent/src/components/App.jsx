import React, { useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Main from './Main';
import { BrowserRouter as Route } from 'react-router-dom';
import { getStorage } from '../utils/getStorage';

const App = () => {
  const [user, setUser] = useState(getStorage("user"))

  return (
    <Route>
      <Header user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} />
      <Footer />
    </Route>
  );
}
 
export default App;