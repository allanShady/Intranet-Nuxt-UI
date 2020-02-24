async function getProjects($axios) {
  var Items;

  return $axios
    .$get('/Projects')
    .then(response => console.log(response))
    .catch(error => console.log(error))    
}

export {
  getProjects,
}
