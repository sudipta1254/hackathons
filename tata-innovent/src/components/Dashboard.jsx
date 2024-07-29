import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const Dashboard = ({user, setUser}) => {
   document.title = "myApp - Dashboard"
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(!user?.logged && "/")
   }, [user])

   return (
      <div className="Dashboard">
         <h2>Dashboard</h2>
         <p>Welcome, {user && user.email}</p>
         <p>Environment: { process.env.NODE_ENV }</p>
      </div>
   );
}
 
export default Dashboard;