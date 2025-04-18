import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { createCategory, updateCategory } from '@/services/categoryApi'

export default function CategoryForm({ editData, onSuccess }: any) {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (editData) setName(editData.name)
  }, [editData])

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    if (image) formData.append('image', image)

    try {
      if (editData) {
        await updateCategory(editData.id, formData)
        toast.success('Category updated successfully!')
      } else {
        await createCategory(formData)
        toast.success('Category created successfully!')
      }

      setName('')
      setImage(null)
      setPreviewUrl(null)
      onSuccess()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-2 max-h-40 rounded border border-gray-300"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
      >
        {editData ? 'Update Category' : 'Add Category'}
      </button>
    </form>
  )
}
