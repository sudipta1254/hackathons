import axios from "axios"
import { removeCookie } from "./userCookie"

const deleteAccount = (_id, setUser) => {
   const consent = prompt("Sure delete your account? Type 'delete my account'.")?.trim().toLocaleLowerCase()
   if (consent === "delete my account") {
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${_id}`)

      removeCookie("innovent-user")
      setUser(null)
   }
}

export default deleteAccount