import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'
import { useRouter } from 'next/router'

export default function LogoutButton() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  )
}