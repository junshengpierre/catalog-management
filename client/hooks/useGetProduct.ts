import { useQuery } from 'react-query'
import { api } from '../api'

export const useGetProduct = (pid: string) => {
  return useQuery('productListItem', async () => {
    const { data } = await api.get(`/product/${pid}`)
    return data
  })
}
