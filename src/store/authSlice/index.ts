import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload
      state.isAuthenticated = true
    },
    logout(state) {
      state.token = null
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer
