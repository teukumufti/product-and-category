import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) router.push('/login')
    }, [isAuthenticated])

    return isAuthenticated ? <WrappedComponent {...props} /> : null
  }
}

export default withAuth
