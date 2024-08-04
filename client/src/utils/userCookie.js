import Cookies from "js-cookie"

export const getCookie = (key) => {
   const cookies = Cookies.get(key, {secure:true})
   return cookies && JSON.parse(cookies)
}

export const setCookie = (key, value) => {
   Cookies.set(key, JSON.stringify(value), {expires:1, secure:true})
}

export const removeCookie = (key) => {
   Cookies.remove(key, {secure:true})
}