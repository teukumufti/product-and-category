import { useState, useEffect } from 'react'
import { createProduct, updateProduct } from '@/services/productApi'

export default function ProductForm({ editData, onSuccess }: any) {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (editData) {
      setName(editData.name)
    }
  }, [editData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    if (image) formData.append('image', image)

    if (editData) await updateProduct(editData.id, formData)
    else await createProduct(formData)

    alert(editData ? 'Updated' : 'Created')
    setName('')
    setImage(null)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
      >
        {editData ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  )
}