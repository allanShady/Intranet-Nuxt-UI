export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJhbGFuLmNhbWlsb0BpbmNlbnRlYS5jb20iLCJuYmYiOjE1ODIyNzg2NTYsImV4cCI6MTU4Mjg4MzQ1NiwiaWF0IjoxNTgyMjc4NjU2fQ.BsWy2DF8BE7qz_aoKyt5OvTfjBSqC95XTSyQoREFC0gs9ZRgnpVeuudHuyRgTo3H09Mo6hsqeVIcgdM80DsjZQ';
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
    config.headers.common['Authorization'] = `Bearer ${token}`;
  });

  // Inject to context as $axios
  inject('axios', axios);
}