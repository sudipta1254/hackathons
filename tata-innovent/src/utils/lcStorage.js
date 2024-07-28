export const lcStorage = (task, id, val) => {
   return task === "get" ?
      JSON.parse(localStorage.getItem(id)) :
      localStorage.setItem(id, val)
}