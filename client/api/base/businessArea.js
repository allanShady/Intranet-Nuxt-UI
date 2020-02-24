function getBusinessArea($axios) {
   $axios
    .$get('/BusinessArea')
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export { getBusinessArea };
