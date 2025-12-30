import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'https://verto-be-production.up.railway.app/api/v1',
  withCredentials: true,
})

export default axiosInstance
