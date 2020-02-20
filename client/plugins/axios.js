


export default function ({ $axios, redirect }, inject) {
  let url = 'https://192.168.3.106:5001/';
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
       common: {
         //Accept: 'text/plain, */*'
       }
    }
  })

  // Set baseURL to something different
  api.setBaseURL(url)

  // Inject to context as $api
  inject('api', api)
}
