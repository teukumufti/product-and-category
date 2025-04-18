import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '@/services/categoryApi'

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await api.getCategories(params)
      return res.data
    } catch (error: any) {
      if (error.response?.status === 404) {
        return []
      }
      return rejectWithValue(error.response?.data || 'Error fetching categories')
    }
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload || []
        state.loading = false
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.data = []
        state.loading = false
      })
  }
})

export const categoryReducer = categorySlice.reducer
