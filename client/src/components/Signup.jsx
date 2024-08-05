import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getCookie, setCookie } from '../utils/userCookie'
import bcrypt from "bcryptjs"
import axios from "axios"

const Signup = ({rMe, setrMe, user, setUser}) => {
   document.title = "AutoGenie - Signup"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setconfirmPassword] = useState("")
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(user?.logged && "/dashboard")
   }, [user, navigate])

   const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true)

      if (password !== confirmPassword) {
         setError("Passwords do not match")
         setLoading(false)
         return
      }
      try {
         const { data: data1 } = await axios.get(process.env.REACT_APP_BACKEND_URL)
         data1?.forEach(u => {
            if (u.email === email) {
               setError("Email already exists")
               setLoading(false)
               return
            }
         })
         const hashedPassword = bcrypt.hashSync(password, 10)

         const { data: data2 } = await axios.post(process.env.REACT_APP_BACKEND_URL, {
            email, password: hashedPassword
         })
         setCookie("innovent-user", { _id: data2._id, email, rMe: true, logged: true })
         setUser(getCookie("innovent-user"))
         alert("Welcome to AutoGenie")
         setLoading(false)
      } catch (err) {
         console.log(err)
         setLoading(false)
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
                     onChange={e => {
                        setEmail(e.target.value);
                        setError("")
                     }}
                  />
                  <label htmlFor="email">Email:</label>
               </div>
               <div className="input-field col s12">
                  <input id="password" type="password" value={password} required
                     onChange={e => {
                        setPassword(e.target.value);
                        setError("")
                     }}
                  />
                  <label htmlFor="password">Password:</label>
               </div>
               <div className="input-field col s12">
                  <input id="confirmPassword" type="password" value={confirmPassword} required
                     onChange={e => {
                        setconfirmPassword(e.target.value)
                        setError("")
                     }}
                  />
                  <label htmlFor="confirmPassword">Confirm password:</label>
               </div>
               <div className="col s12 signup-btn-div form-btn">
                  <button className="btn login-btn" type="submit">
                     {loading ? <i className="material-icons login-signup-rotate large">refresh</i> : "Signup"}
                  </button>
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