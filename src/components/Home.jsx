import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Home = ({user, setUser}) => {
   document.title = "autoGenie - Tata Innovent"
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "dashboard")
   }, [])

   return (
      <div className="Home center">
         <h1>Home page</h1>
         <div className="links center">
            <div>
               <span><Link to="/login">Login</Link></span> |
               <span><Link to="/signup">Signup</Link></span>
            </div>
         </div>
      </div>
   );
}
 
export default Home;