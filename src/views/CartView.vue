<template>
  <div class="min-h-screen">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" v-auto-animate>
      <h1 class="mb-8 text-center text-2xl font-bold text-(--ui-text-highlighted)">
        Your Shopping Cart
      </h1>

      <!-- Empty cart state -->
      <div
        v-if="cartItemsCount === 0"
        class="flex flex-col items-center justify-center py-12"
        :key="1"
      >
        <UIcon name="i-heroicons-shopping-cart" class="mb-4 h-24 w-24" />
        <h2 class="mb-2 text-2xl font-medium">Your cart is empty</h2>
        <p class="mb-6 px-4 text-center">Looks like you haven't added anything to your cart yet.</p>
        <UButton
          color="neutral"
          size="lg"
          to="/shop"
          class="flex items-center gap-2 rounded-full border-4 px-4 py-3 transition-transform hover:scale-105"
        >
          <UIcon name="i-lucide-arrow-left" class="size-5" />
          Continue Shopping
        </UButton>
      </div>

      <!-- Cart with items -->
      <div v-else class="grid grid-cols-1 gap-8 lg:grid-cols-3" :key="2">
        <!-- Cart items list -->
        <div class="lg:col-span-2">
          <TransitionGroup
            name="list"
            tag="ul"
            class="divide-y divide-(--ui-border-inverted)"
            v-auto-animate
          >
            <li v-for="item in cartItems" :key="item.id" class="animate-fade-in flex py-6">
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-full w-full cursor-pointer object-cover object-center"
                  @click="viewProductDetails(item.productId, item.id)"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col">
                <div class="flex justify-between">
                  <div>
                    <h3
                      class="cursor-pointer text-lg font-medium text-(--ui-text-highlighted)"
                      @click="viewProductDetails(item.productId, item.id)"
                    >
                      {{ item.name }}
                    </h3>
                    <p class="mt-1 text-sm text-(--ui-text)">{{ item.size }}</p>
                  </div>
                  <p class="text-lg font-medium text-(--ui-text-highlighted)">
                    {{ formatCurrency(item.price) }}
                  </p>
                </div>

                <div class="flex flex-1 items-end justify-between">
                  <div class="flex items-center">
                    <UButton
                      size="sm"
                      color="neutral"
                      icon="i-heroicons-minus"
                      :disabled="item.quantity <= 1"
                      @click="decrementQuantity(item.id)"
                      class="transition-transform hover:scale-105"
                    />
                    <span class="mx-3 w-8 text-center">{{ item.quantity }}</span>
                    <UButton
                      size="sm"
                      color="neutral"
                      icon="i-heroicons-plus"
                      @click="incrementQuantity(item.id)"
                      class="transition-transform hover:scale-105"
                    />
                  </div>

                  <ConfirmationModal
                    action-type="remove"
                    :item="{ name: item.name, size: item.size }"
                    @confirm="removeItemFromCart(item.id)"
                  />
                </div>
              </div>
            </li>
          </TransitionGroup>

          <div class="mt-6 flex justify-between">
            <ConfirmationModal action-type="clear" @confirm="clearCart" />
            <UButton
              color="neutral"
              to="/shop"
              class="flex items-center gap-2 rounded-full border-4 px-4 py-3 transition-transform hover:scale-105"
            >
              <UIcon name="i-heroicons-arrow-left" />
              Continue Shopping
            </UButton>
          </div>
        </div>

        <!-- Order summary -->
        <div class="lg:col-span-1">
          <div class="animate-slide-in-right rounded-2xl bg-(--ui-bg-muted) p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-semibold text-(--ui-text-highlighted)">Order Summary</h2>
            <div class="space-y-4">
              <div class="flex justify-between">
                <p class="text-(--ui-text-toned)">Subtotal ({{ cartItemsCount }} items)</p>
                <p class="font-medium">{{ formatCurrency(totalPrice) }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-(--ui-text-toned)">Shipping</p>
                <p class="font-medium">{{ formatCurrency(0) }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-(--ui-text-toned)">Tax</p>
                <p class="font-medium">{{ formatCurrency(0) }}</p>
              </div>
              <div class="flex justify-between border-t pt-4">
                <p class="text-lg font-semibold">Total</p>
                <p class="text-primary text-lg font-bold">{{ formatCurrency(totalPrice) }}</p>
              </div>
            </div>

            <UButton
              block
              color="neutral"
              size="lg"
              class="mt-6 rounded-full bg-(--ui-bg-inverted) px-5 py-3 transition-transform hover:scale-105"
            >
              Proceed to Checkout
            </UButton>

            <div class="mt-4 flex items-center justify-center gap-2 text-sm text-(--ui-text-toned)">
              <UIcon name="i-heroicons-lock-closed" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { formatCurrency } from '@/utils/formatCurrency'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ConfirmationModal from '@/components/shop/ConfirmationModal.vue'

const router = useRouter()

const productStore = useProductStore()
const { cartItemsCount, cartItems, totalPrice } = storeToRefs(productStore)
const { incrementQuantity, decrementQuantity, removeItemFromCart, clearCart } = productStore

const viewProductDetails = (productId: number, variantId: number) => {
  console.log(`Viewing details for product ID: ${variantId}`)
  router.push(`/shop/details/${productId}/${variantId}`)
}
</script>
