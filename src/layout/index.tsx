import Link from 'next/link'
import LogoutButton from '@/components/atom/LogoutButton'

export default function Layout({ children }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-lg font-semibold text-gray-700 hover:text-purple-600">
            Products
          </Link>
          <Link href="/categories" className="text-lg font-semibold text-gray-700 hover:text-purple-600">
            Categories
          </Link>
        </div>
        <LogoutButton />
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}
