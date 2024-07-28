import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Main from './Main';
import { BrowserRouter as Route } from 'react-router-dom';

const App = () => {
  return (
    <Route>
      <Header />
      <Main />
      <Footer />
    </Route>
  );
}
 
export default App;