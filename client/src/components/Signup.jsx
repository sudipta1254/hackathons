import React, { useEffect, useState } from 'react'
import { getStorage } from "../utils/getStorage"
import { Link, useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"
import axios from "axios"

const Signup = ({user, setUser}) => {
   document.title = "AutoGenie - Signup"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [rePassword, setRePassword] = useState("")
   const [error, setError] = useState("")
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user, navigate])

   const handleSubmit = async e => {
      e.preventDefault()

      if (password !== rePassword) {
         setError("Passwords do not match")
         return
      }
      try {
         const { data: data1 } = await axios.get(process.env.REACT_APP_BACKEND_URL)
         data1?.forEach(u => {
            if (u.email === email) {
               setError("Email already exists")
               return
            }
         })
         const hashedPassword = bcrypt.hashSync(password, 10)

         await axios.post(process.env.REACT_APP_BACKEND_URL, {
            email, password: hashedPassword
         })
         localStorage.setItem("user", JSON.stringify({
            email, password: hashedPassword, logged: true
         }))
         setUser(getStorage("user"))
      } catch (err) {
         setError(err)
         console.log(err)
      }
   }
   
   return (
      <div className="Signup">
         <h3 className="top-text center">Signup</h3>
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
                  <button className="btn login-btn" type="submit">Signup</button>
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