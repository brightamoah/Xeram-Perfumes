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

const variantInCart = computed(() => {
  if (!product.value || !selectedVariant.value) return { inCart: false, quantity: 0 }
  const cartItem = cartItems.find((item) => item.id === selectedVariant.value.id)
  return { inCart: !!cartItem, quantity: cartItem ? cartItem.quantity : 0 }
})

const selectVariant = (variant: Product['variant'][0]) => {
  const previousSelected = selectedVariant.value
  const clickedIndex = reorderedVariants.value.findIndex((v) => v.id === variant.id)
  const newVariants = [...reorderedVariants.value]
  newVariants[clickedIndex] = previousSelected
  const previousSelectedIndex = reorderedVariants.value.findIndex((v) => v.id === previousSelected.id)
  if (previousSelectedIndex !== -1) newVariants[previousSelectedIndex] = variant
  reorderedVariants.value = newVariants
  selectedVariant.value = variant
  router.push({ name: 'productDetails', params: { id: product.value.id, variantId: variant.id } })
}

const feedbackVisible = ref(false)
const addItemToCart = () => {
  if (!product.value || !selectedVariant.value) return
  try {
    addToCart(product.value.id, selectedVariant.value.id)
    feedbackVisible.value = true
    setTimeout(() => { feedbackVisible.value = false }, 2500)
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  }
}

onMounted(() => {
  const variantId = Number(route.params.variantId)
  if (variantId && product.value) {
    const variant = product.value.variant.find((v) => v.id === variantId)
    if (variant) selectedVariant.value = variant
  }
})
</script>

<template>
  <div class="product-detail-page min-h-screen bg-ivory dark:bg-obsidian pt-8 pb-32">
    <div class="max-w-7xl mx-auto px-6 md:px-12">

      <!-- Breadcrumb -->
      <div class="mb-12 flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-ash font-light">
        <RouterLink to="/" class="hover:text-gold transition-colors duration-300">Home</RouterLink>
        <span class="text-gold/40">—</span>
        <RouterLink to="/shop" class="hover:text-gold transition-colors duration-300">Shop</RouterLink>
        <span class="text-gold/40">—</span>
        <span class="text-obsidian dark:text-ivory">{{ product.name }}</span>
      </div>

      <!-- Main product layout -->
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">

        <!-- IMAGE COLUMN -->
        <div>
          <!-- Main image -->
          <div class="relative aspect-[3/4] w-full overflow-hidden bg-cream dark:bg-charcoal group">
            <img
              :src="selectedVariant.image"
              :alt="product.name"
              class="w-full h-full object-contain p-12 transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <!-- Gold border on hover -->
            <div class="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-700 pointer-events-none" />
          </div>

          <!-- Variant thumbnails -->
          <div class="mt-4 flex gap-3">
            <div
              v-for="variant in displayVariants"
              :key="variant.id"
              class="variant-thumb group relative aspect-square w-20 cursor-pointer overflow-hidden bg-cream dark:bg-charcoal border border-gold/10 hover:border-gold/40 transition-colors duration-300"
              @click="selectVariant(variant)"
            >
              <img
                :src="variant.image"
                :alt="variant.size"
                class="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute bottom-0 left-0 right-0 py-1 text-center">
                <span class="text-[8px] tracking-widest text-ash uppercase">{{ variant.size }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- INFO COLUMN -->
        <div class="flex flex-col justify-center">

          <!-- Category -->
          <p class="text-[9px] tracking-[0.5em] uppercase text-gold font-light mb-4">{{ product.category }}</p>

          <!-- Product name -->
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-light text-obsidian dark:text-ivory mb-6 leading-tight">
            {{ product.name }}
          </h1>

          <div class="gold-divider mb-8" style="margin-left: 0; margin-right: auto;" />

          <!-- Description -->
          <p class="text-sm font-light text-ash dark:text-smoke leading-loose mb-10 max-w-md">
            {{ product.description }}
          </p>

          <!-- Price & Size row -->
          <div class="border-t border-gold/15 border-b border-gold/15 py-6 mb-8">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-2">Price</p>
                <p class="font-display text-3xl font-light text-obsidian dark:text-ivory">
                  {{ formatCurrency(selectedVariant.price) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-2">Size</p>
                <p class="font-display text-3xl font-light text-obsidian dark:text-ivory">
                  {{ selectedVariant.size }}
                </p>
              </div>
            </div>
          </div>

          <!-- Variant selector -->
          <div class="mb-10">
            <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-4">Select Size</p>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="variant in reorderedVariants"
                :key="variant.id"
                @click="selectVariant(variant)"
                class="size-selector text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300"
                :class="variant.id === selectedVariant.id ? 'active' : ''"
              >
                {{ variant.size }}
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="relative">
            <button
              class="add-to-cart-btn w-full py-5 text-[10px] tracking-[0.4em] uppercase font-light transition-all duration-500"
              @click="addItemToCart"
            >
              <span v-if="!feedbackVisible">
                {{ variantInCart.inCart ? `Add One More (${variantInCart.quantity} in cart)` : 'Add to Cart' }}
              </span>
              <span v-else class="text-gold">✦ Added to Cart</span>
            </button>

            <!-- Feedback shimmer -->
            <div
              v-if="feedbackVisible"
              class="cart-feedback-shimmer absolute inset-0 pointer-events-none"
            />
          </div>

          <!-- Ingredients -->
          <div class="mt-12 pt-8 border-t border-gold/15">
            <p class="text-[9px] tracking-[0.3em] uppercase text-ash font-light mb-6">Fragrance Notes</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="ingredient-item">
                <p class="text-[8px] tracking-[0.3em] uppercase text-gold/60 font-light mb-1">Top</p>
                <p class="text-sm font-light text-obsidian dark:text-ivory">Pink Grapefruit</p>
              </div>
              <div class="ingredient-item">
                <p class="text-[8px] tracking-[0.3em] uppercase text-gold/60 font-light mb-1">Heart</p>
                <p class="text-sm font-light text-obsidian dark:text-ivory">Jasmine</p>
              </div>
              <div class="ingredient-item">
                <p class="text-[8px] tracking-[0.3em] uppercase text-gold/60 font-light mb-1">Base</p>
                <p class="text-sm font-light text-obsidian dark:text-ivory">Petite (France)</p>
              </div>
              <div class="ingredient-item">
                <p class="text-[8px] tracking-[0.3em] uppercase text-gold/60 font-light mb-1">Origin</p>
                <p class="text-sm font-light text-obsidian dark:text-ivory">100% Organic</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.product-detail-page { }

.bg-ivory { background-color: #f5f0eb; }
.bg-obsidian { background-color: #0a0a0a; }
.bg-cream { background-color: #f0ebe4; }
.bg-charcoal { background-color: #1a1a1a; }
.text-gold { color: #c9a84c; }
.text-obsidian { color: #0a0a0a; }
.text-ivory { color: #f5f0eb; }
.text-ash { color: #888888; }
.text-smoke { color: #bbbbbb; }
.border-gold { border-color: rgba(201,168,76,0.15); }

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}

.size-selector {
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: #888888;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}
.size-selector:hover {
  border-color: rgba(201, 168, 76, 0.5);
  color: #0a0a0a;
}
.dark .size-selector:hover { color: #f5f0eb; }
.size-selector.active {
  border-color: #c9a84c;
  background: rgba(201, 168, 76, 0.08);
  color: #c9a84c;
}

.add-to-cart-btn {
  background: #0a0a0a;
  color: #f5f0eb;
  border: 1px solid #0a0a0a;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.dark .add-to-cart-btn {
  background: #f5f0eb;
  color: #0a0a0a;
  border-color: #f5f0eb;
}
.add-to-cart-btn:hover {
  background: #c9a84c;
  border-color: #c9a84c;
  color: #0a0a0a;
}

.cart-feedback-shimmer {
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
  animation: shimmer-sweep 1s ease-in-out;
}
@keyframes shimmer-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
