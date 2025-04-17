import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://mockapi.io/api/v1', 
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
