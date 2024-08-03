import { getStorage } from "./getStorage"

export const logout = (user, setUser) => {
   if (user?.logged) {
      const { email, password, logged } = user
      localStorage.setItem("innovent-user", JSON.stringify({
         email, password, logged: !logged
      }))
      setUser(getStorage("user"))
   }
}