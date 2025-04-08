<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'
import type { Product } from '@/types/types'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const id = ref<number>(Number(route.params.id))
const { getProductById, addToCart, cartItems } = productStore

const product = ref(getProductById(id.value))

if (!product.value) {
  router.push({ name: 'not-found' })
}
const selectedVariant = ref(product.value.variant[0])

const reorderedVariants = ref([...(product.value.variant || [])])

const displayVariants = computed(() => {
  return reorderedVariants.value.filter((variant) => variant.id !== selectedVariant.value.id)
})

// Compute whether the current variant is already in cart and its quantity
const variantInCart = computed(() => {
  if (!product.value || !selectedVariant.value) return { inCart: false, quantity: 0 }

  const cartItem = cartItems.find((item) => item.id === selectedVariant.value.id)
  return {
    inCart: !!cartItem,
    quantity: cartItem ? cartItem.quantity : 0,
  }
})

// Function to update the selected variant and swap positions
const selectVariant = (variant: Product['variant'][0]) => {
  const previousSelected = selectedVariant.value

  // Find the index of the clicked variant
  const clickedIndex = reorderedVariants.value.findIndex((v) => v.id === variant.id)

  // Create a new array with the swap
  const newVariants = [...reorderedVariants.value]
  newVariants[clickedIndex] = previousSelected // Put previously selected variant in clicked position

  // Find where the previously selected variant was and put the newly selected there
  const previousSelectedIndex = reorderedVariants.value.findIndex(
    (v) => v.id === previousSelected.id,
  )
  if (previousSelectedIndex !== -1) {
    newVariants[previousSelectedIndex] = variant
  }

  // Update the reordered variants
  reorderedVariants.value = newVariants

  // Update the selected variant
  selectedVariant.value = variant

  router.push({
    name: 'productDetails',
    params: { id: product.value.id, variantId: variant.id },
  })
}

const addItemToCart = () => {
  if (!product.value || !selectedVariant.value) {
    console.error('No product or variant selected')
    return
  }

  try {
    addToCart(product.value.id, selectedVariant.value.id)
    // Show feedback to user
    showAddedToCartFeedback()
  } catch (error) {
    console.error('Failed to add item to cart:', error)
    alert('Failed to add item to cart. Please try again.')
  }
}

// Visual feedback when item is added to cart
const feedbackVisible = ref(false)
const showAddedToCartFeedback = () => {
  feedbackVisible.value = true
  setTimeout(() => {
    feedbackVisible.value = false
  }, 2000)
}

// Check if variant ID is in URL params and select that variant
onMounted(() => {
  const variantId = Number(route.params.variantId)
  if (variantId && product.value) {
    const variant = product.value.variant.find((v) => v.id === variantId)
    if (variant) {
      selectedVariant.value = variant
    }
  }
})
</script>

<template>
  <div class="container mx-auto -mt-10 min-h-screen w-[80%]">
    <div class="container mx-auto py-3 md:px-4 md:py-8">
      <!-- Product Display Section -->
      <div class="flex flex-col gap-8 md:flex-row">
        <!-- Product Image -->
        <div class="w-full md:w-1/2">
          <div class="p-4 md:p-8">
            <img
              :src="selectedVariant.image"
              :alt="product.name"
              class="mx-auto w-full max-w-md rounded-2xl"
            />
          </div>

          <!-- Thumbnail Images -->
          <div class="mt-4 flex justify-center space-x-8 md:space-x-13">
            <div
              v-for="variant in displayVariants"
              :key="variant.id"
              class="h-24 w-24 transform cursor-pointer overflow-hidden rounded-lg object-cover shadow-md transition-transform duration-300 ease-in-out hover:scale-100"
              @click="selectVariant(variant)"
            >
              <img :src="variant.image" :alt="variant.size" class="h-full w-full" />
            </div>
          </div>
        </div>

        <!-- Product Information -->
        <div class="mt-10 flex w-full flex-col md:w-1/2">
          <h1 class="mb-4 px-3 text-4xl font-light text-(--ui-text-highlighted)">
            {{ product.name }}
          </h1>

          <div class="mb-6 rounded-lg p-3">
            <p class="text-base leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- Price and Size -->
          <div class="mb-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">Price</p>
              <p class="font-medium">Size</p>
            </div>

            <USeparator
              class="my-2"
              type="solid"
              size="sm"
              :ui="{
                border: 'border-(--ui-border-inverted)',
              }"
            />

            <div class="flex items-center justify-between">
              <p class="text-base font-medium">{{ formatCurrency(selectedVariant.price) }}</p>
              <p class="text-base font-medium">{{ selectedVariant.size }}</p>
            </div>
          </div>

          <!-- Cart status feedback -->
          <!-- <div v-if="variantInCart.inCart" class="mb-3 text-center text-sm text-green-600">
            This variant is already in your cart (Quantity: {{ variantInCart.quantity }})
          </div> -->

          <!-- Add to Cart Button -->
          <div class="relative mt-3 flex w-full items-center justify-center">
            <UButton
              :label="variantInCart.inCart ? 'Add One More' : 'Add to Cart'"
              leading-icon="i-lucide-shopping-cart"
              size="xl"
              color="neutral"
              class="cursor-pointer items-center rounded-full border-2 border-(--ui-border-inverted) bg-(--ui-bg) px-8 py-3 font-semibold text-(--ui-text-highlighted) transition duration-300 ease-in-out hover:bg-(--ui-bg-inverted) hover:text-white dark:text-(--ui-text) dark:hover:bg-(--ui-bg-inverted) dark:hover:text-black"
              @click="addItemToCart"
            />

            <!-- Feedback message -->
            <!-- <div
              v-show="feedbackVisible"
              class="absolute -top-90 left-1/2 -translate-x-1/2 transform animate-bounce rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
            >
              Added to cart!
            </div> -->
          </div>

          <!-- Ingredients and Details -->
          <div class="mt-15 md:mt-25">
            <div class="mb-4">
              <div class="flex justify-between">
                <p class="font-medium text-(--ui-text-highlighted)">Ingredients</p>
                <p class="font-medium text-(--ui-text-highlighted)">Details</p>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between">
                <p class="text-base">Pink Grapefruit</p>
                <p class="text-base">100% Organic</p>
              </div>

              <div class="flex justify-between">
                <p class="text-base">Jasmine</p>
                <p class="text-base">Female</p>
              </div>

              <div class="flex justify-between">
                <p class="text-base">Petite (France)</p>
                <p class="text-base"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
