import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Dashboard = ({user, setUser}) => {
   document.title = "autoGenie - Dashboard"
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(!user?.logged && "/")
   }, [user])

   return (
      <div className="Dashboard">
         <div className="dashboard-header">
            <h4>Welcome, {user && user.email}</h4>
            <h5>User dashboard</h5>
         </div>
         <hr />
         <div className="dashboard-body">
            <div className="dashboard-account">
               <h6>Account: </h6><span>{ user && user.email }</span>
               <div className="account-live"><b>LIVE</b></div>
            </div>
            <div className="plans">
               <div className="plan-1 plan-each">
                  <i className="material-icons">account_circle</i>
                  <h5>Active</h5>
                  <p>Account</p>
               </div>
               <div className="plan-3 plan-each">
                  <i className="material-icons">checklist_rtl</i>
                  <h5>0</h5>
                  <p>Proposals proposed</p>
               </div>
               <div className="plan-4 plan-each">
                  <i className="material-icons">done_all</i>
                  <h5>0</h5>
                  <p>Proposals approved</p>
               </div>
            </div>
            <hr />
            <div className="ai-link">
               <div className="get-started">
                  <i className="material-icons">star</i>
                  <h5>Get started</h5>
               </div>
               <Link to="/ai">Personalize with AI</Link>
            </div>
         </div>
      </div>
   );
}
 
export default Dashboard;