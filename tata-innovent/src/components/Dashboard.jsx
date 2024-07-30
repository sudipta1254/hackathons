import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Dashboard = ({user, setUser}) => {
   document.title = "personaAI - Dashboard"
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
                  <i className="material-icons">business_center</i>
                  <h5>Free</h5>
                  <p>Plan</p>
               </div>
               <div className="plan-2 plan-each">
                  <i className="material-icons">check_box</i>
                  <h5>1,000</h5>
                  <p>Chats per month</p>
               </div>
               <div className="plan-3 plan-each">
                  <i className="material-icons">chat</i>
                  <h5>0</h5>
                  <p>Chats done</p>
               </div>
               <div className="plan-4 plan-each">
                  <i className="material-icons">receipt_long</i>
                  <h5>$0</h5>
                  <p>Invoice amount</p>
               </div>
            </div>
            <hr />
            <div className="note">
               <b>Note: If you are on a trial plan then after the trial plan ends your account will be automatically moved to Free plan if you do not wish to upgrade to a paid plan.</b>
            </div>
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