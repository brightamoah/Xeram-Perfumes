import type { RouteLocationRaw } from "vue-router";
import type { RouteNamedMap } from "vue-router/auto-routes";

export interface MenuItems {
  label: string;
  to?: RouteLocationRaw;
  route: { name: keyof RouteNamedMap };
}

export interface Collection {
  title: string;
  description: string;
  image: string;
}

export interface Delivery {
  title: string;
  description: string;
  image: string;
  srcSet?: string;
  imageAlt: string;
}

export interface Variant {
  id: number;
  size: string;
  price: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  defaultImage: string;
  category?: string;
  description?: string;
  variant: Variant[];
}

export interface Variants {
  variantId: number;
  size: string;
  price: number;
  image: string;
}

export interface NewProduct {
  id: number;
  name: string;
  category?: string;
  description?: string;
  variants: Variants[];
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}
