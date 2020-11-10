export interface Product {
  id: string
  title: string
  description: string
  image: string | null
  quantity: number
  price: number
  status: 'Public' | 'Private'
  createdAt: Date
  updatedAt: Date
}

export enum ProductStatus {
  Public = 'Public',
  Private = 'Private',
}
