
export default function ({ $axios, redirect }, inject) {

  // Create a custom axios instance
  const api = $axios.create({
    headers: {
       common: {
         //Accept: 'text/plain, */*'
       }
    }
  })

  // Set baseURL to something different
  api.setBaseURL('https://localhost:5001/')

  // Inject to context as $api
  inject('api', api)
}
