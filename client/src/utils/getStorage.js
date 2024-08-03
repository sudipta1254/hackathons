export const getStorage = (id) => {
   const lc = JSON.parse(localStorage.getItem(id))
   return lc
}