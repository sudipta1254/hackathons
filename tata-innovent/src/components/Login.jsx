import React, { useState } from 'react'
import { lcStorage } from "../utils/lcStorage"

const Login = () => {
   document.title = "myApp - Login"
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      const user = lcStorage("get", "usaer")
      !user?.id && setError("User not found")
      console.log(e.target[0].value)
   }
   
   return (
      <div className="Login container center">
         <h3>Login</h3>
         { error && <p style={{color:"red"}}>{error}</p> }
         <form onSubmit={handleSubmit}>
            <div>
               <label>Email:</label>
               <input type="text" value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            <div>
               <label>Password:</label>
               <input type="text" value={password}
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            <button type="submit">Login</button>
         </form>
      </div>
   );
}
 
export default Login;