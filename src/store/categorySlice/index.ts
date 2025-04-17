import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '@/services/categoryApi'

export const fetchCategories = createAsyncThunk('categories/fetch', async (params: any) => {
  const res = await api.getCategories(params)
  return res.data
})

const categorySlice = createSlice({
  name: 'categories',
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
  }
})

export const categoryReducer = categorySlice.reducer
