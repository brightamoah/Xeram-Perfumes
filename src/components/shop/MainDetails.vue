<script setup lang="ts">
import type { Product } from "@/types/types";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/ProductStore";
import { formatCurrency } from "@/utils/formatCurrency";

const route = useRoute("/shop/details/[id]/[variantId]");
const router = useRouter();
const productStore = useProductStore();

const id = ref<number>(Number(route.params.id));
const { getProductById, addToCart, cartItems } = productStore;

const product = ref(getProductById(id.value));

if (!product.value) {
  router.push({ name: "/[...path]" });
}
const selectedVariant = ref(product.value.variant[0]);
const reorderedVariants = ref([...(product.value.variant || [])]);

const displayVariants = computed(() => {
  return reorderedVariants.value.filter(variant => variant.id !== selectedVariant.value.id);
});

const variantInCart = computed(() => {
  if (!product.value || !selectedVariant.value) return { inCart: false, quantity: 0 };
  const cartItem = cartItems.find(item => item.id === selectedVariant.value.id);
  return { inCart: !!cartItem, quantity: cartItem ? cartItem.quantity : 0 };
});

function selectVariant(variant: Product["variant"][0]) {
  const previousSelected = selectedVariant.value;
  const clickedIndex = reorderedVariants.value.findIndex(v => v.id === variant.id);
  const newVariants = [...reorderedVariants.value];
  newVariants[clickedIndex] = previousSelected;
  const previousSelectedIndex = reorderedVariants.value.findIndex(v => v.id === previousSelected.id);
  if (previousSelectedIndex !== -1) newVariants[previousSelectedIndex] = variant;
  reorderedVariants.value = newVariants;
  selectedVariant.value = variant;
  router.push({
    name: "/shop/details/[id]/[variantId]",
    params: { id: product.value.id, variantId: variant.id },
  });
};

const feedbackVisible = ref(false);
function addItemToCart() {
  if (!product.value || !selectedVariant.value) return;
  try {
    addToCart(product.value.id, selectedVariant.value.id);
    feedbackVisible.value = true;
    setTimeout(() => { feedbackVisible.value = false; }, 2500);
  }
  catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};

onMounted(() => {
  const variantId = Number(route.params.variantId);
  if (variantId && product.value) {
    const variant = product.value.variant.find(v => v.id === variantId);
    if (variant) selectedVariant.value = variant;
  }
});
</script>

<template>
  <div class="bg-ivory-50 dark:bg-obsidian pt-8 pb-32 min-h-screen product-detail-page">
    <div class="mx-auto px-6 md:px-12 max-w-7xl">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-3 mb-10 font-light text-[9px] text-ash uppercase tracking-[0.3em]">
        <RouterLink
          to="/"
          class="hover:text-gold transition-colors duration-300"
        >
          Home
        </RouterLink>

        <span class="text-gold/40">—</span>

        <RouterLink
          to="/shop"
          class="hover:text-gold transition-colors duration-300"
        >
          Shop
        </RouterLink>

        <span class="text-gold/40">—</span>

        <span class="text-obsidian dark:text-ivory">{{ product.name }}</span>
      </div>

      <!-- Main product layout -->
      <div class="gap-12 md:gap-20 grid grid-cols-1 md:grid-cols-2">
        <!-- IMAGE COLUMN -->
        <div>
          <!-- Main image -->
          <div class="group relative bg-cream dark:bg-charcoal w-full aspect-3/4 overflow-hidden">
            <img
              :src="selectedVariant.image"
              :alt="product.name"
              class="p-12 w-full h-full object-contain group-hover:scale-105 transition-transform duration-[1.5s]"
            >
            <!-- Gold border on hover -->
            <div class="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-700 pointer-events-none" />
          </div>

          <!-- Variant thumbnails -->
          <div class="flex gap-3 mt-4">
            <div
              v-for="variant in displayVariants"
              :key="variant.id"
              class="group relative bg-cream dark:bg-charcoal border border-gold/10 hover:border-gold/40 w-20 aspect-square overflow-hidden transition-colors duration-300 cursor-pointer variant-thumb"
              @click="selectVariant(variant)"
            >
              <img
                :src="variant.image"
                :alt="variant.size"
                class="p-3 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
              >

              <div class="right-0 bottom-0 left-0 absolute py-1 text-center">
                <span class="text-[8px] text-ash uppercase tracking-widest">{{ variant.size }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- INFO COLUMN -->
        <div class="flex flex-col justify-center">
          <!-- Category -->
          <p class="mb-4 font-light text-[9px] text-gold uppercase tracking-[0.5em]">
            {{ product.category }}
          </p>

          <!-- Product name -->
          <h1 class="mb-6 font-display font-light text-obsidian dark:text-ivory text-4xl md:text-5xl lg:text-6xl leading-tight">
            {{ product.name }}
          </h1>

          <div
            class="mb-8 gold-divider"
            style="margin-left: 0; margin-right: auto;"
          />

          <!-- Description -->
          <p class="mb-10 max-w-md font-light text-ash dark:text-smoke text-sm leading-loose">
            {{ product.description }}
          </p>

          <!-- Price & Size row -->
          <div class="mb-8 py-6 border-gold/15 border-gold/15 border-t border-b">
            <div class="flex justify-between items-center">
              <div>
                <p class="mb-2 font-light text-[9px] text-ash uppercase tracking-[0.3em]">
                  Price
                </p>

                <p class="font-display font-light text-obsidian dark:text-ivory text-3xl">
                  {{ formatCurrency(selectedVariant.price) }}
                </p>
              </div>

              <div class="text-right">
                <p class="mb-2 font-light text-[9px] text-ash uppercase tracking-[0.3em]">
                  Size
                </p>

                <p class="font-display font-light text-obsidian dark:text-ivory text-3xl">
                  {{ selectedVariant.size }}
                </p>
              </div>
            </div>
          </div>

          <!-- Variant selector -->
          <div class="mb-10">
            <p class="mb-4 font-light text-[9px] text-ash uppercase tracking-[0.3em]">
              Select Size
            </p>

            <div class="flex flex-wrap gap-3">
              <button
                v-for="variant in reorderedVariants"
                :key="variant.id"
                class="size-selector font-light text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                :class="variant.id === selectedVariant.id ? 'active' : ''"
                @click="selectVariant(variant)"
              >
                {{ variant.size }}
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="relative">
            <button
              class="add-to-cart-btn py-5 w-full font-light text-[10px] uppercase tracking-[0.4em] transition-all duration-500"
              @click="addItemToCart"
            >
              <span v-if="!feedbackVisible">
                {{ variantInCart.inCart ? `Add One More (${variantInCart.quantity} in cart)` : 'Add to Cart' }}
              </span>

              <span
                v-else
                class="text-gold"
              >✦ Added to Cart</span>
            </button>

            <!-- Feedback shimmer -->
            <div
              v-if="feedbackVisible"
              class="absolute inset-0 pointer-events-none cart-feedback-shimmer"
            />
          </div>

          <!-- Ingredients -->
          <div class="mt-12 pt-8 border-gold/15 border-t">
            <p class="mb-6 font-light text-[9px] text-ash uppercase tracking-[0.3em]">
              Fragrance Notes
            </p>

            <div class="gap-4 grid grid-cols-2">
              <div class="ingredient-item">
                <p class="mb-1 font-light text-[8px] text-gold/60 uppercase tracking-[0.3em]">
                  Top
                </p>

                <p class="font-light text-obsidian dark:text-ivory text-sm">
                  Pink Grapefruit
                </p>
              </div>

              <div class="ingredient-item">
                <p class="mb-1 font-light text-[8px] text-gold/60 uppercase tracking-[0.3em]">
                  Heart
                </p>

                <p class="font-light text-obsidian dark:text-ivory text-sm">
                  Jasmine
                </p>
              </div>

              <div class="ingredient-item">
                <p class="mb-1 font-light text-[8px] text-gold/60 uppercase tracking-[0.3em]">
                  Base
                </p>

                <p class="font-light text-obsidian dark:text-ivory text-sm">
                  Petite (France)
                </p>
              </div>

              <div class="ingredient-item">
                <p class="mb-1 font-light text-[8px] text-gold/60 uppercase tracking-[0.3em]">
                  Origin
                </p>

                <p class="font-light text-obsidian dark:text-ivory text-sm">
                  100% Organic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .product-detail-page { } */

.bg-ivory {
  background-color: #f5f0eb;
}
.bg-obsidian {
  background-color: #0a0a0a;
}
.bg-cream {
  background-color: #f0ebe4;
}
.bg-charcoal {
  background-color: #1a1a1a;
}
.text-gold {
  color: #c9a84c;
}
.text-obsidian {
  color: #0a0a0a;
}
.text-ivory {
  color: #f5f0eb;
}
.text-ash {
  color: #888888;
}
.text-smoke {
  color: #bbbbbb;
}
.border-gold {
  border-color: rgba(201, 168, 76, 0.15);
}

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
.dark .size-selector:hover {
  color: #f5f0eb;
}
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
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.15), transparent);
  animation: shimmer-sweep 1s ease-in-out;
}
@keyframes shimmer-sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
