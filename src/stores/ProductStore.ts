import type { CartItem, Product } from '@/types/types'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('ProductStore', () => {
  const id = ref<number>(1)
  const variantID = ref<number>(101)

  const products = ref<Product[]>([
    {
      id: id.value++,
      name: 'Club De Nuit',
      category: 'Xeram Originals',
      description:
        'Club De Nuit is a luxurious and sensual fragrance that exudes mystery and sophistication. With its rich blend of dark floral, deep spices, and velvety notes, this scent captivates the senses and leaves a lasting impression. Perfect for those who seek a bold, elegant fragrance that stands out in any crowd.',
      defaultImage: '/img/perf.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 19.99,
          image: '/img/perf.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 39.99,
          image: '/img/perf2.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 59.99,
          image: '/img/perf3.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 79.99,
          image: '/img/perf4.png',
        },
      ],
    },
    {
      id: id.value++,
      name: 'Oud De Arabia',
      category: 'Xeram Impressions',
      description:
        'Oud De Arabia is a rich and exotic fragrance inspired by the mystique of the Middle East. With its warm oud notes, hints of amber, and a touch of spice, this scent is perfect for those who desire a bold and captivating aroma.',
      defaultImage: '/img/perf2.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 24.99,
          image: '/img/perf3.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 49.99,
          image: '/img/perf4.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 69.99,
          image: '/img/perf5.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 79.99,
          image: '/img/perf6.png',
        },
      ],
    },
    {
      id: id.value++,
      name: 'Asad',
      category: 'Xeram Originals',
      description:
        'Asad is a vibrant and energetic fragrance that embodies confidence and charisma. With its fresh citrus notes, aromatic spices, and a woody base, this scent is ideal for those who want to make a lasting impression.',
      defaultImage: '/img/perf3.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 14.99,
          image: '/img/perf6.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 44.99,
          image: '/img/perf4.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 64.99,
          image: '/img/perf3.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 79.99,
          image: '/img/perf2.png',
        },
      ],
    },
    {
      id: id.value++,
      name: 'Allure Homme',
      category: 'Xeram Impressions',
      description:
        'Allure Homme is a timeless and elegant fragrance that combines fresh citrus, warm spices, and a hint of vanilla. This scent is perfect for the modern gentleman who values sophistication and style.',
      defaultImage: '/img/perf4.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 22.99,
          image: '/img/perf3.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 42.99,
          image: '/img/perf2.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 62.99,
          image: '/img/perf4.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 79.99,
          image: '/img/perf5.png',
        },
      ],
    },
    {
      id: id.value++,
      name: 'Chanel No 5',
      category: 'Xeram Impressions',
      description:
        'Chanel No 5 is a classic and iconic fragrance that exudes elegance and femininity. With its floral bouquet, soft aldehydes, and a touch of musk, this scent is a timeless choice for any occasion.',
      defaultImage: '/img/perf5.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 24.99,
          image: '/img/perf4.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 54.99,
          image: '/img/perf6.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 74.99,
          image: '/img/perf5.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 79.99,
          image: '/img/perf3.png',
        },
      ],
    },
    {
      id: id.value++,
      name: 'Black Orchid',
      category: 'Xeram Impressions',
      description:
        'Black Orchid is a luxurious and sensual fragrance that combines dark floral notes, rich spices, and a hint of chocolate. This scent is perfect for those who want to make a bold statement with their fragrance.',
      defaultImage: '/img/perf6.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 29.99,
          image: '/img/perf5.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 59.99,
          image: '/img/perf2.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 79.99,
          image: '/img/perf4.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 89.99,
          image: '/img/perf3.png',
        },
      ],
    },
    {
      id: id.value++,
      name: 'Asad',
      category: 'Xeram Originals',
      description:
        'Asad is a bold and powerful fragrance that captures the essence of strength and masculinity. With its woody and spicy notes, this scent is perfect for those who want to make a statement.',
      defaultImage: '/img/perf.png',
      variant: [
        {
          id: variantID.value++,
          size: '20ml',
          price: 29.99,
          image: '/img/perf.png',
        },
        {
          id: variantID.value++,
          size: '50ml',
          price: 59.99,
          image: '/img/perf3.png',
        },
        {
          id: variantID.value++,
          size: '100ml',
          price: 79.99,
          image: '/img/perf4.png',
        },
        {
          id: variantID.value++,
          size: '150ml',
          price: 99.99,
          image: '/img/perf5.png',
        },
      ],
    },
  ])

  const cartItems = ref<CartItem[]>([])

  const selectedProduct = ref<Product | null>(null)

  const productById = computed(() => {
    return (id: number) => {
      const product = products.value.find((product) => product.id === id)
      console.log(`Product with ID ${id} found:`, product)
      if (!product) {
        console.log(`Product with ID ${id} not found`)
      }
      return product as Product
    }
  })

  const getProductById = (id: number) => {
    return products.value.find((product) => product.id === id) as Product
  }

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  function addToCart(productId: number, variantId: number, quantity: number = 1): void {
    try {
      if (!productId || !variantId || quantity <= 0) {
        throw new Error('Invalid product ID, variant ID, or quantity')
      }

      const product = getProductById(productId)
      if (!product) {
        throw new Error('Product not found')
      }

      const variant = product.variant.find((v) => v.id === variantId)
      if (!variant) {
        throw new Error('Variant not found')
      }

      // Check for existing item with the same variant ID
      const existingItemIndex = cartItems.value.findIndex((item) => item.id === variantId)

      if (existingItemIndex !== -1) {
        // If item exists, only increment quantity without affecting cart count
        cartItems.value[existingItemIndex].quantity += quantity
        console.log(
          `Increased quantity of ${product.name} (${variant.size}) to ${cartItems.value[existingItemIndex].quantity}`,
        )
      } else {
        // If item doesn't exist, add it to cart (this will affect the cart count)
        cartItems.value.push({
          id: variant.id,
          productId: product.id,
          name: product.name,
          size: variant.size,
          price: variant.price,
          image: variant.image,
          quantity: quantity,
        })
        console.log(`Added ${product.name} (${variant.size}) to cart`)
      }
    } catch (error: unknown) {
      console.error('Error adding item to cart:', error instanceof Error ? error.message : error)
    }
  }

  function removeItemFromCart(variantId: number): void {
    try {
      if (!variantId) {
        throw new Error('Invalid item ID')
      }

      const index = cartItems.value.findIndex((cartItem) => cartItem.id === variantId)
      if (index === -1) {
        throw new Error('Item not found in cart')
      }

      cartItems.value.splice(index, 1)
    } catch (error: unknown) {
      console.error(
        'Error removing item from cart:',
        error instanceof Error ? error.message : error,
      )
    }
  }

  function incrementQuantity(itemId: number): void {
    try {
      const item = cartItems.value.find((i) => i.id === itemId)
      if (!item) {
        throw new Error('Item not found in cart')
      }
      item.quantity++
    } catch (error: unknown) {
      console.error(
        'Error incrementing item quantity:',
        error instanceof Error ? error.message : error,
      )
    }
  }
  function decrementQuantity(variantId: number): void {
    try {
      const item = cartItems.value.find((i) => i.id === variantId)
      if (!item) {
        throw new Error('Item not found in cart')
      }
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeItemFromCart(variantId)
      }
    } catch (error: unknown) {
      console.error(
        'Error decrementing item quantity:',
        error instanceof Error ? error.message : error,
      )
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  const cartItemsCount = computed(() => {
    return cartItems.value.length
  })

  return {
    products,
    selectedProduct,
    productById,
    cartItems,
    totalPrice,
    addToCart,
    removeItemFromCart,
    getProductById,
    clearCart,
    cartItemsCount,
    incrementQuantity,
    decrementQuantity,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
