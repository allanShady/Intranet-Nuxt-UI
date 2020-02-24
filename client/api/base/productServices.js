function getProducts($axios) {
  return $axios
  .$get('/Products')
  .then(response => {console.log('I WAS CALLED'); console.log(response)})
  .catch(error => console.log(error))
}

export {getProducts};