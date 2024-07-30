import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Home = ({user, setUser}) => {
   document.title = "AutoGenie - Tata Innovent"
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "dashboard")
   }, [])

   return (
      <div className="Home center">
         <div className="homepage-top-links">
            <span><Link to="/login">Login</Link></span> |&#8198;
            <span><Link to="/signup">Signup</Link></span>
         </div>
         <div className="homepage-intro">
            <div className="autogenie">
               <h1>AutoGenie</h1>
               <div class="swiper">
                  <div class="swiper-inner">
                     <div class="first">
                        <span>Think</span>
                     </div>
                     <div class="second">
                        <span>Create</span>
                     </div>
                     <div class="third">
                        <span>Share</span>
                     </div>
                  </div>
               </div>
            </div>
            <h3>"The AI chatbot that turns your dream car ideas into a fully customized vehicle model, tailored to your exact specifications."</h3>
         </div>
      </div>
   );
}
 
export default Home;