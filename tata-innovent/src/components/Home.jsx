import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { lcStorage } from '../utils/lcStorage'

const Home = () => {
   const navigate = useNavigate()
   
   useEffect(() => {
      const user = lcStorage("get", "user")
      console.log(user)

      navigate(user ? "/" : "login")
   }, [])

   return (
      <div className="Home">
         <h1>Home page</h1>
      </div>
   );
}
 
export default Home;