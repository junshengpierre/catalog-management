import { useMutation, useQueryCache } from 'react-query'
import { useRouter } from 'next/router'
import { api } from '../api'

export const useDeleteProduct = (pid) => {
  const queryCache = useQueryCache()
  const router = useRouter()

  return useMutation(
    async () => {
      return await api.delete(`/product/${pid}`)
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries('productList')
        router.push('/')
      },
    }
  )
}
