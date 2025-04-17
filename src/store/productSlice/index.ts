import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '@/services/productApi'

export const fetchProducts = createAsyncThunk('products/fetch', async (params) => {
  const res = await api.getProducts(params)
  return res.data
})


const productSlice = createSlice({
  name: 'products',
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
  }
})

export const productReducer = productSlice.reducer
