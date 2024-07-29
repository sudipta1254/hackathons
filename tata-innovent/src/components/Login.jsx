import React, { useEffect, useState } from 'react'
import { getStorage } from "../utils/getStorage"
import { Link, useNavigate } from "react-router-dom"

const Login = ({user, setUser}) => {
   document.title = "myApp - Login"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user])

   const handleSubmit = (e) => {
      e.preventDefault()
      const user = getStorage("user")
      if (email !== user.email) {
         setError("Email doesn't match")
      } else if (password !== user.password) {
         setError("Password doesn't match")
      } else {
         localStorage.setItem("user", JSON.stringify({
            email: user.email,
            password: user.password,
            logged: !user.logged
         }))
         setUser(getStorage("user"))
      }
   }
   
   return (
      <div className="Login">
         <h3 className="center">Login</h3>
         { error && <p className="error-text" style={{color:"red",textAlign:"center"}}>{error}</p> }
         <form onSubmit={handleSubmit}>
            <div className="row form-inner">
               <div className="input-field col s12">
                  <input id="email" type="text" value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email:</label>
               </div>
               <div className="input-field col s12">
                  <input id="password" type="text" value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password:</label>
               </div>
               <div className="col s12 login-btn-div">
                  <button className="btn login-btn blue lighten-1" type="submit">Login</button>
               </div>
               <div className="forgot-pass">
                  <Link to="/login">Forgot password?</Link>
               </div>
               <div className="col s12 signup-link-div">
                  <span>Don't have an account? </span>
                  <Link className="signup-link" to="/signup">Signup</Link>
               </div>
            </div>
         </form>
      </div>
   );
}
 
export default Login;