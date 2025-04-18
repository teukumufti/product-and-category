import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://6802199181c7e9fbcc4459f6.mockapi.io/mockapi', 
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
