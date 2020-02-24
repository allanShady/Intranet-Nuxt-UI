async function getUnities($axios) {
   return await $axios
    .$get('/Unities')
    .then(response => console.log(response)
    .catch(error => console.log(error)));
}

export { getUnities };
