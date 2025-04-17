import { authReducer, login, logout } from '../authSlice'

describe('authSlice', () => {
  it('should login with token', () => {
    const state = authReducer(undefined, login('token123'))
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe('token123')
  })

  it('should logout properly', () => {
    const state = authReducer({ token: 'xxx', isAuthenticated: true }, logout())
    expect(state.isAuthenticated).toBe(false)
    expect(state.token).toBe(null)
  })
})
