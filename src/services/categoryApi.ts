import axiosInstance from './axiosInstance'

export const getCategories = (params: any) => axiosInstance.get('/categories', { params })
export const createCategory = (data: any) => axiosInstance.post('/categories', data)
export const updateCategory = (id: string | number, data: any) => axiosInstance.put(`/categories/${id}`, data)
export const deleteCategory = (id: string | number) => axiosInstance.delete(`/categories/${id}`)
