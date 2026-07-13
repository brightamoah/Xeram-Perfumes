<script setup lang="ts">
import type { Product } from "@/types/types";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/ProductStore";
import { formatCurrency } from "@/utils/formatCurrency";

const router = useRouter();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const categories = ref<string[]>(["All Products", "Xeram Impressions", "Xeram Originals"]);
const selectedCategory = ref<string>("All Products");

const filteredProducts = computed<Product[]>(() => {
  if (selectedCategory.value === "All Products") return products.value;
  return products.value.filter(product => product.category === selectedCategory.value);
});

function viewProductDetails(product: Product, variantId: number) {
  router.push({
    name: "/shop/details/[id]/[variantId]",
    params: { id: product.id, variantId },
  });
}

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("revealed")),
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
});
</script>

<template>
  <div class="bg-ivory-50  pt-16 pb-32 min-h-screen shop-page">
    <!-- Hero Header -->
    <div class="px-6 py-20 border-gold-500/10 border-b text-center reveal-on-scroll">
      <p class="mb-4 font-light text-[10px] text-gold-500 uppercase tracking-[0.5em]">
        Xeram Collection
      </p>

      <h1 class="mb-6 font-display font-light text-ivory-950  text-5xl md:text-7xl tracking-wide">
        The Atelier
      </h1>

      <div class="mx-auto mb-6 gold-divider" />

      <p class="mx-auto max-w-md font-light text-ivory-500 text-sm leading-loose">
        Every fragrance is a world unto itself. Explore and find yours.
      </p>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap justify-center items-center gap-10 px-6 py-12 border-gold-500/10 border-b reveal-on-scroll">
      <button
        v-for="category in categories"
        :key="category"
        class="font-light text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 category-filter"
        :class="selectedCategory === category ? 'active' : ''"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Product Grid -->
    <div
      v-auto-animate="{ duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }"
      class="gap-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 px-6 md:px-12 reveal-on-scroll"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.variant[0].id"
        class="group relative flex flex-col border-gold-500/10 border-r last:border-r-0 border-b cursor-pointer shop-card"
        @click="viewProductDetails(product, product.variant[0].id)"
      >
        <!-- Image -->
        <div class="relative bg-ivory-100  w-full aspect-[3/4] overflow-hidden">
          <img
            :src="product.variant[0].image"
            :alt="product.name"
            class="p-6 w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1.5s]"
          >
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-ivory-950/0 group-hover:bg-ivory-950/10 transition-all duration-500" />
          <!-- Gold border reveal -->
          <div class="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/25 transition-all duration-700 pointer-events-none" />
          <!-- CTA overlay -->
          <div class="bottom-0 absolute inset-x-0 bg-gradient-to-t from-obsidian/80 to-transparent px-4 py-5 transition-transform translate-y-full group-hover:translate-y-0 duration-500">
            <div class="flex justify-center items-center gap-2">
              <span class="font-light text-[9px] text-gold-500 uppercase tracking-[0.3em]">View Details</span>

              <span class="text-gold-500 text-xs">→</span>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="px-5 py-6 text-center">
          <p class="mb-2 font-light text-[9px] text-gold-500/70 uppercase tracking-[0.3em]">
            {{ product.category }}
          </p>

          <h3 class="mb-3 font-display font-light text-ivory-950  group-hover:text-gold-500 text-lg transition-colors duration-300">
            {{ product.name }}
          </h3>

          <div class="mx-auto mb-3 gold-divider" />

          <p class="font-light text-ivory-500 text-sm">
            {{ formatCurrency(product.variant[0].price) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .shop-page { } */

.category-filter {
  position: relative;
  padding-bottom: 4px;
  color: #888888;
  background: none;
  border: none;
  cursor: pointer;
}
.category-filter::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.category-filter:hover,
.category-filter.active {
  color: #0a0a0a;
}
.dark .category-filter:hover,
.dark .category-filter.active {
  color: #f5f0eb;
}
.category-filter.active::after,
.category-filter:hover::after {
  transform: scaleX(1);
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
.border-gold-500 {
  border-color: rgba(201, 168, 76, 0.1);
}

.gold-divider {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
</style>
