import withAuth from '@/utils/withAuth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/store/productSlice'
import { fetchCategories } from '@/store/categorySlice'
import { deleteProduct } from '@/services/productApi'
import { RootState, AppDispatch } from '@/store'
import ProductForm from '@/components/organism/ProductForm'
import ConfirmModal from '@/components/moleculs/confirm-modal'

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: products, loading } = useSelector((state: RootState) => state.products)
  const { data: categories } = useSelector((state: RootState) => state.categories)

  const [query, setQuery] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [sortAsc, setSortAsc] = useState<boolean>(true)
  const [filter, setFilter] = useState<string>('')
  const [editData, setEditData] = useState<any>(null)

  const fetchAll = () => {
    dispatch(fetchProducts({
      page,
      limit: 5,
      category: filter
    }))
  }

  useEffect(() => {
    fetchAll()
  }, [query, page, sortAsc, filter])

  useEffect(() => {
    dispatch(fetchCategories({}))
  },[])

  const confirmDelete = async () => {
    if (!selectedId) return
    await deleteProduct(selectedId)
    setShowModal(false)
    setSelectedId(null)
    fetchAll()
  }


  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">Products</h2>

      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-md">
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Category</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.slug || cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Sort: {sortAsc ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <ProductForm editData={editData} onSuccess={fetchAll} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full mt-6 table-auto border-collapse bg-white shadow rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Not found
                </td>
              </tr>
            ) : (
              products.map((p: any) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">
                    <img src={p.image} width={50} className="rounded" />
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => setEditData(p)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => {
                          setSelectedId(p.id)
                          setShowModal(true)
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>

      <ConfirmModal
        show={showModal}
        title="Delete Product?"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default withAuth(ProductPage)