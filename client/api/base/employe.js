function getEmployees($axios) {
  $axios
    .$get('/Employees')
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export { getEmployees };