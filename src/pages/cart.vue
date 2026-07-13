<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import ConfirmationModal from "@/components/shop/ConfirmationModal.vue";
import { useProductStore } from "@/stores/ProductStore";
import { formatCurrency } from "@/utils/formatCurrency";

const router = useRouter();
const productStore = useProductStore();
const { cartItemsCount, cartItems, totalPrice } = storeToRefs(productStore);
const { incrementQuantity, decrementQuantity, removeItemFromCart, clearCart } = productStore;

function viewProductDetails(productId: number, variantId: number) {
  router.push(`/shop/details/${productId}/${variantId}`);
}
</script>

<template>
  <div class="bg-ivory-50 pt-10 pb-32 min-h-screen cart-page">
    <div
      v-auto-animate
      class="mx-auto px-6 md:px-12 max-w-7xl"
    >
      <!-- Header -->
      <div class="mb-16 pt-8 text-center">
        <p class="mb-4 font-light text-[10px] text-gold-500 uppercase tracking-[0.5em]">
          Your Selection
        </p>

        <h1 class="font-display font-light text-ivory-950 text-4xl md:text-6xl tracking-wide">
          Shopping Cart
        </h1>

        <div class="mx-auto mt-6 gold-divider" />
      </div>

      <!-- Empty cart -->
      <div
        v-if="cartItemsCount === 0"
        :key="1"
        class="flex flex-col justify-center items-center text-center"
      >
        <div class="mb-10">
          <UIcon
            name="i-lucide-shopping-bag"
            class="size-20 text-primary/50"
          />
        </div>

        <h2 class="mb-4 font-display font-light text-ivory-950 text-3xl">
          Your cart is empty
        </h2>

        <div class="mx-auto mb-6 gold-divider" />

        <p class="mb-10 max-w-sm font-light text-ivory-500 text-sm">
          Discover our curated collection of luxury fragrances.
        </p>

        <RouterLink
          to="/shop"
          class="luxury-btn px-12 py-4"
        >
          Explore Collection
        </RouterLink>
      </div>

      <!-- Cart with items -->
      <div
        v-else
        :key="2"
        class="gap-12 grid grid-cols-1 lg:grid-cols-3"
      >
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="mb-0 gold-divider-full" />

          <TransitionGroup
            v-auto-animate
            name="list"
            tag="ul"
          >
            <li
              v-for="item in cartItems"
              :key="item.id"
              class="flex gap-6 py-8 border-gold-500/10 border-b cart-item"
            >
              <!-- Thumbnail -->
              <div
                class="flex-shrink-0 bg-ivory-100 border border-gold-500/10 hover:border-gold-500/30 w-24 h-32 overflow-hidden transition-colors duration-300 cursor-pointer cart-thumb"
                @click="viewProductDetails(item.productId, item.id)"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="p-3 w-full h-full object-contain"
                >
              </div>

              <!-- Details -->
              <div class="flex flex-col flex-1 justify-between">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="mb-1 font-light text-[9px] text-gold-500 uppercase tracking-[0.3em]">
                      {{ item.size }}
                    </p>

                    <h3
                      class="font-display font-light text-ivory-950 hover:text-gold-500 text-xl transition-colors duration-300 cursor-pointer"
                      @click="viewProductDetails(item.productId, item.id)"
                    >
                      {{ item.name }}
                    </h3>
                  </div>

                  <p class="font-display font-light text-ivory-950 text-xl">
                    {{ formatCurrency(item.price) }}
                  </p>
                </div>

                <div class="flex justify-between items-center mt-4">
                  <!-- Quantity controls -->
                  <div class="flex items-center gap-0 border border-gold-500/20 qty-controls">
                    <button
                      class="flex justify-center items-center hover:bg-gold/10 w-9 h-9 text-ivory-500 :text-ivory-50 hover:text-ivory-950 transition-all duration-200 qty-btn"
                      :disabled="item.quantity <= 1"
                      @click="decrementQuantity(item.id)"
                    >
                      <span class="text-xs">−</span>
                    </button>

                    <span class="w-10 font-light text-ivory-950 text-xs text-center tracking-widest">{{ item.quantity }}</span>

                    <button
                      class="flex justify-center items-center hover:bg-gold/10 w-9 h-9 text-ivory-500 :text-ivory-50 hover:text-ivory-950 transition-all duration-200 qty-btn"
                      @click="incrementQuantity(item.id)"
                    >
                      <span class="text-xs">+</span>
                    </button>
                  </div>

                  <!-- Remove -->
                  <ConfirmationModal
                    action-type="remove"
                    :item="{ name: item.name, size: item.size }"
                    @confirm="removeItemFromCart(item.id)"
                  />
                </div>
              </div>
            </li>
          </TransitionGroup>

          <!-- Bottom actions -->
          <div class="flex justify-between items-center mt-8">
            <ConfirmationModal
              action-type="clear"
              @confirm="clearCart"
            />

            <RouterLink
              to="/shop"
              class="flex items-center gap-2 font-light text-[10px] text-ivory-500 hover:text-gold-500 uppercase tracking-[0.3em] transition-colors duration-300"
            >
              <span>← Continue Shopping</span>
            </RouterLink>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="order-summary-panel bg-ivory-950 p-8 border border-gold-500/15">
            <h2 class="mb-8 font-display font-light text-ivory-50 text-2xl">
              Order Summary
            </h2>

            <div
              class="mb-8 gold-divider"
              style="margin-left: 0;"
            />

            <div class="space-y-5 mb-8">
              <div class="flex justify-between">
                <p class="font-light text-ivory-500 text-xs tracking-wide">
                  Subtotal ({{ cartItemsCount }} items)
                </p>

                <p class="font-light text-ivory-50 text-sm">
                  {{ formatCurrency(totalPrice) }}
                </p>
              </div>

              <div class="flex justify-between">
                <p class="font-light text-ivory-500 text-xs tracking-wide">
                  Shipping
                </p>

                <p class="font-light text-gold-500 text-sm">
                  Complimentary
                </p>
              </div>

              <div class="flex justify-between">
                <p class="font-light text-ivory-500 text-xs tracking-wide">
                  Tax
                </p>

                <p class="font-light text-ivory-50 text-sm">
                  {{ formatCurrency(0) }}
                </p>
              </div>
            </div>

            <div class="flex justify-between items-center mb-8 pt-6 border-gold-500/15 border-t">
              <p class="font-light text-[9px] text-ivory-500 uppercase tracking-[0.3em]">
                Total
              </p>

              <p class="font-display font-light text-ivory-50 text-3xl">
                {{ formatCurrency(totalPrice) }}
              </p>
            </div>

            <button class="mb-5 py-5 w-full font-light text-[10px] uppercase tracking-[0.4em] checkout-btn">
              Proceed to Checkout
            </button>

            <div class="flex justify-center items-center gap-2 font-light text-[9px] text-ivory-500/60 uppercase tracking-[0.2em]">
              <UIcon
                name="i-heroicons-lock-closed"
                class="size-3 text-gold-500/50"
              />

              <span>Secure & encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-ivory-50 {
  background-color: #f5f0eb;
}
.bg-ivory-950 {
  background-color: #0a0a0a;
}
.bg-ivory-100 {
  background-color: #f0ebe4;
}
.bg-ivory-900 {
  background-color: #1a1a1a;
}
.text-gold-500 {
  color: #c9a84c;
}
.text-ivory-950 {
  color: #0a0a0a;
}
.text-ivory-50 {
  color: #f5f0eb;
}
.text-ivory-500 {
  color: #888888;
}

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), transparent);
}

.empty-cart-icon {
  width: 80px;
  height: 80px;
  border: 1px solid rgba(201, 168, 76, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  border-right: 1px solid rgba(201, 168, 76, 0.2);
}
.qty-btn:last-child {
  border-right: none;
  border-left: 1px solid rgba(201, 168, 76, 0.2);
}
.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.order-summary-panel {
  position: sticky;
  top: 100px;
}

.checkout-btn {
  background: #c9a84c;
  color: #0a0a0a;
  border: 1px solid #c9a84c;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: "Inter", sans-serif;
}
.checkout-btn:hover {
  background: transparent;
  color: #c9a84c;
}

/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
