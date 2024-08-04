import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getCookie, setCookie } from '../utils/userCookie'
import bcrypt from "bcryptjs"
import axios from "axios"

const Login = ({rMe, setrMe, user, setUser}) => {
   document.title = "AutoGenie - Login"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user, navigate])

   const handleSubmit = async e => {
      e.preventDefault()
      
      try {
         const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL)
         const local = data.find(u => u.email === email)
         if (!local) {
            setError("Invalid email")
         } else if (!bcrypt.compareSync(password, local?.password)) {
            setError("Invalid passowrd")
         } else {
            setCookie("innovent-user", { _id: local._id, email, rMe, logged: true })
            setUser(getCookie("innovent-user"))
            console.log('Login success')
         }
      } catch (err) {
         setError(err)
         console.log(err)
      }
   }
   
   return (
      <div className="Login">
         <h3 className="top-text center">Login</h3>
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
               <div className="col s12 login-btn-div form-btn">
                  <button className="btn login-btn" type="submit">Login</button>
               </div>
               <div className="rMe-forgot-pass">
                  <label>
                     <input type="checkbox" onChange={e => setrMe(e.target.checked)} />
                     <span>Remember me</span>
                  </label>
                  <Link to="/login">Forgot password?</Link>
               </div>
               <div className="col s12 signup-link-div form-link">
                  <div>
                     <span>Don't have an account? </span>
                     <Link className="signup-link" to="/signup">Signup</Link>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}
 
export default Login;