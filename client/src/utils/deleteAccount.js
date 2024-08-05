import axios from "axios"
import $ from "jquery"
import { removeCookie } from "./userCookie"

const deleteAccount = (_id, setUser) => {
   const consent = prompt("Sure delete your account? Type 'delete my account'.")?.trim().toLocaleLowerCase()
   if (consent === "delete my account") {
      $(".account-delete-btn").text("Deleting account...")
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${_id}`)
         .then(response => {
            console.log(response)
            removeCookie("innovent-user")
            setUser(null)
            alert("Account deleted successfully!")
         })
         .catch(error => {
            console.error(error)
            alert("Account deletion unsuccess!")
         })
   } else
      alert(0)
}

export default deleteAccount