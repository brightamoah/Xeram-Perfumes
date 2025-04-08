import type { RouteRecordNameGeneric } from 'vue-router'

export interface MenuItems {
  label: string
  to?: string
  route: { name: RouteRecordNameGeneric }
}

export interface Collection {
  title: string
  description: string
  image: string
}

export interface Delivery {
  title: string
  description: string
  image: string
  srcSet?: string
  imageAlt: string
}

export type Variant = {
  id: number
  size: string
  price: number
  image: string
}

export type Product = {
  id: number
  name: string
  defaultImage: string
  category?: string
  description?: string
  variant: Variant[]
}

export type Variants = {
  variantId: number
  size: string
  price: number
  image: string
}

export type NewProduct = {
  id: number
  name: string
  category?: string
  description?: string
  variants: Variants[]
}

export type CartItem = {
  id: number
  productId: number
  name: string
  size: string
  price: number
  image: string
  quantity: number
}
