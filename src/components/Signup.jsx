import React, { useEffect, useState } from 'react'
import { getStorage } from "../utils/getStorage"
import { Link, useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"

const Signup = ({user, setUser}) => {
   document.title = "personaAI - Signup"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [rePassword, setRePassword] = useState("")
   const [error, setError] = useState("")
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user])

   const handleSubmit = (e) => {
      e.preventDefault()
      const user = getStorage("user")
      if (email === user?.email) {
         setError("Email already exists")
      } else if (password !== rePassword) {
         setError("Passwords do not match")
      } else {
         bcrypt.hash(password, 10, (err, password) => {
            if (err) {
               console.error('Error hashing password:', err);
               setError(err)
            } else {
               // Store the hash in your database
               localStorage.setItem("user", JSON.stringify({
                  email, password, logged: true
               }))
               setUser(getStorage("user"))
            }
         })
      }
   }
   
   return (
      <div className="Signup">
         <h3 className="center">Signup</h3>
         { error && <p className="error-text" style={{color:"red",textAlign:"center"}}>{error}</p> }
         <form onSubmit={handleSubmit}>
            <div className="row form-inner">
               <div className="input-field col s12">
                  <input id="email" type="email" value={email} required
                     onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email:</label>
               </div>
               <div className="input-field col s12">
                  <input id="password" type="password" value={password} required
                     onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password:</label>
               </div>
               <div className="input-field col s12">
                  <input id="rePassword" type="password" value={rePassword} required
                     onChange={e => setRePassword(e.target.value)}
                  />
                  <label htmlFor="rePassword">Reenter password:</label>
               </div>
               <div className="col s12 signup-btn-div form-btn">
                  <button className="btn login-btn blue lighten-1" type="submit">Signup</button>
               </div>
               <div className="col s12 login-link-div form-link">
                  <span>Already have an account? </span>
                  <Link className="signup-link" to="/login">Login</Link>
               </div>
            </div>
         </form>
      </div>
   );
}
 
export default Signup;