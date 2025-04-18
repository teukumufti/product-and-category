import { motion, AnimatePresence } from 'framer-motion'

export default function ConfirmModal({
  show,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  onConfirm,
  onCancel,
}: {
  show: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
