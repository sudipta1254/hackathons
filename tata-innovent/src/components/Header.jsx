import React, { useEffect, useState } from 'react'
import spark from "../assets/spark.svg"
import { Link } from "react-router-dom"
import { lcStorage } from '../utils/lcStorage'
import { logout } from '../utils/logout'
import $ from "jquery"
import M from "materialize-css"

const flex = {display:"flex",alignItems:"center",justifyContent:"space-between"};

const Header = () => {
   // const [user, setUser] = useState(null)
   const user = lcStorage("get", "user")

   $(function() {
      $('.header-navlink').on('click', e => {
         M.Sidenav.getInstance($('.sidenav')).close()
      })
   })
   useEffect(() => {
      M.AutoInit()
   }, [])
   // useEffect(() => {
   //    setUser(lcUser)
   // }, [lcUser])

   return (
      <header className='header blue lighten-4 green-text text-darken-2' style={flex}>
         <div className="app-logo-text">
            <img src={spark} alt="app logo" />
            <p><Link to="/">myApp</Link></p>
         </div>
         <div>
            <a href='#!' data-target="slide-nav" className="sidenav-trigger">
               <i className="material-icons green-text text-lighten-1">menu</i>
            </a>
         </div>
         <ul className="sidenav" id="slide-nav">
            <li><a className="subheader" href="#!">More options</a></li>
            { user ? <li><Link className="header-navlink navlink-home" to="/home">Home</Link></li> : null }
            { !user ? <li><Link className="header-navlink navlink-login" to="/login">Login</Link></li> : null }
            { !user ? <li><Link className="header-navlink navlink-home" to="/signup">Signup</Link></li> : null }
            { user ? <li><Link className="header-navlink navlink-home" to="/chatbot">Chatbot</Link></li> : null }
            { user ? <li><Link className="header-navlink navlink-home" to="/dashboard">Dashboard</Link></li> : null }
            { user ? <li><a className="header-navlink navlink-logout" href="#!"
               onClick={logout}
            >Logout</a></li> : null }
         </ul>
      </header>
   );
}

export default Header;
