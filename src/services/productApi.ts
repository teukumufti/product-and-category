import axiosInstance from './axiosInstance'

export const getProducts = (params: any) => axiosInstance.get('/products', { params })
export const getProduct = (id: string) => axiosInstance.get(`/products/${id}`)
export const createProduct = (data: any) => axiosInstance.post('/products', data)
export const updateProduct = (id: string, data: any) => axiosInstance.put(`/products/${id}`, data)
export const deleteProduct = (id: string) => axiosInstance.delete(`/products/${id}`)