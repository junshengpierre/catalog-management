import { useMutation, useQueryCache } from 'react-query'
import { api } from '../api'

export const useUpdateProduct = ({ pid }: { pid: string }) => {
  const queryCache = useQueryCache()

  return useMutation(
    async (formData: any) => {
      const bodyFormData = new FormData()
      bodyFormData.append('title', formData.title)
      bodyFormData.append('description', formData.description)
      bodyFormData.append('quantity', formData.quantity)
      bodyFormData.append('price', formData.price)
      bodyFormData.append('status', formData.status)
      if (formData.file) {
        bodyFormData.append('file', formData.file)
      }
      return await api.patch(`/product/${pid}`, bodyFormData)
    },
    {
      onSuccess: async () => {
        queryCache.invalidateQueries('productList')
        queryCache.invalidateQueries('productListItem')
      },
    }
  )
}
