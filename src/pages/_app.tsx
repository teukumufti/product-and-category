import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '@/layout'
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayout = ['/login'].includes(router.pathname)

  return (
    <Provider store={store}>
      {noLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Toaster position="top-center" />
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  )
}

export default App
