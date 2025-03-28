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
