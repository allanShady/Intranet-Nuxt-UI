export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const axios = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  
  // Set baseURL
  axios.setBaseURL(process.env.baseUrl);

  axios.onRequest((config) => {
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  });

  // Inject to context as $axios
  inject('axios', axios);
}