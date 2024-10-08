// axios
import axios from 'axios'
import router from '../router'
import { useToast } from 'vue-toastification'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://api.moboeats.test/api/v1/' : 'https://api.moboeats.co.uk/api/v1'

const toast = useToast()

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

//  Set the AUTH token for any request
axiosIns.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if(token){
      config.headers.Authorization =  token ? `Bearer ${token}` : '';
  }
  return config;
});

//Intercept every response to check for errors
axiosIns.interceptors.response.use(null, (error) => {
  console.log(error.response)
  switch(error.response.status) {
      case 422:
        if(error.response.data.data == 'no_restaurant') {
          toast.success('Register business to proceed')
          router.push({ name: 'create-restaurant' })
        }
        break;
      case 401: // authentication error, logout the user
        // //destroy token, cause user may have faked role in local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push('/signin');
        break;

      default:
          console.error(error.response.status, error.message);
          // notify.error('Server Error');

  }
return Promise.reject(error);
});

export default axiosIns