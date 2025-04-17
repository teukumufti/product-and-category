import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { login } from '@/store/authSlice'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login('dummy-token'))
    router.push('/products')
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <motion.div
        className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  )
}