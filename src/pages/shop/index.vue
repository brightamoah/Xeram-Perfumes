<script setup lang="ts">
import type { Product } from "@/types/types";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/ProductStore";
import { formatCurrency } from "@/utils/formatCurrency";

const router = useRouter();
// const route = useRoute("/shop/");
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

function selectCategory(category: string) {
  selectedCategory.value = category;

  const optimizedCategory = category.toLocaleLowerCase().replace(" ", "-");
  router.push({ query: { category: optimizedCategory } });
}
</script>

<template>
  <div class="bg-ivory-50 pt-10 pb-32 min-h-screen shop-page">
    <!-- Hero Header -->
    <div class="px-6 py-8 border-gold-500/10 border-b text-center reveal-on-scroll">
      <p class="mb-3 font-light text-gold-500 text-xs uppercase tracking-[0.5em]">
        Xeram Collection
      </p>

      <h1 class="font-display font-light text-ivory-950 text-5xl md:text-7xl tracking-wide">
        The Atelier
      </h1>

      <div class="mx-auto mb-6 gold-divider" />

      <p class="mx-auto mt-4 max-w-md font-light text-ivory-500 text-sm leading-loose">
        Every fragrance is a world unto itself. Explore and find yours.
      </p>
    </div>

    <!-- Category Filters -->
    <div class="sm:flex sm:flex-wrap sm:justify-center sm:items-center gap-10 grid grid-cols-3 px-6 sm:px-6 py-3 sm:py-6 border-gold-500/10 border-b reveal-on-scroll">
      <button
        v-for="category in categories"
        :key="category"
        class="font-light text-xs uppercase tracking-[0.3em] transition-colors duration-300 category-filter"
        :class="selectedCategory === category ? 'active' : ''"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>

    <!-- Product Grid -->
    <div
      v-auto-animate="{ duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }"
      class="gap-0 space-x-1.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 px-6 md:px-12 reveal-on-scroll"
    >
      <div
        v-for="(product, index) in filteredProducts"
        :key="product.variant[0].id"
        class="group relative flex flex-col border-gold-500/10 border-r last:border-r-0 border-b cursor-pointer shop-card"
        @click="viewProductDetails(product, product.variant[0].id)"
      >
        <!-- Image -->
        <div class="relative bg-ivory-100 w-full aspect-3/4 overflow-hidden">
          <img
            :src="product.variant[0].image"
            :alt="product.name"
            class="p-6 w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          >

          <!-- Specimen index, referencing a perfumer's formula number -->
          <div class="top-3 left-3 absolute flex justify-center items-center bg-ivory-50/70 backdrop-blur-sm border border-gold-500/30 w-8 h-8 font-display text-gold-500 text-xs tracking-wider">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <!-- Category tag -->
          <UBadge
            :label="product.category"
            variant="subtle"
            color="neutral"
            size="sm"
            class="top-3 right-3 absolute bg-obsidian/60 backdrop-blur-sm px-2.5 py-1 rounded-none ring-0 font-light text-[9px] text-gold-500 uppercase tracking-[0.2em]"
          />

          <!-- Hover overlay -->
          <!-- <div class="absolute inset-0 bg-ivory-950/0 group-hover:bg-ivory-950/10 transition-all duration-500" /> -->
          <!-- Gold border reveal -->
          <div class="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-700 pointer-events-none" />

          <!-- CTA overlay -->
          <div class="bottom-0 absolute inset-x-0 bg-linear-to-t from-obsidian/85 to-transparent px-4 py-5 transition-transform translate-y-full group-hover:translate-y-0 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <UButton
              variant="link"
              size="xs"
              trailing-icon="i-lucide-arrow-up-right"
              class="justify-center gap-2 p-0 w-full font-medium text-[9px] text-gold-500 uppercase tracking-[0.3em] cursor-pointer"
              @click.stop="viewProductDetails(product, product.variant[0].id)"
            >
              View Details
            </UButton>
          </div>
        </div>

        <!-- Info: name and price share one baseline, joined by a leader -->
        <div class="flex items-baseline gap-2 px-5 py-4">
          <h3
            :title="product.name"
            class="max-w-[60%] font-display font-light text-ivory-950 group-hover:text-gold-500 text-base truncate tracking-wide transition-colors duration-300 shrink-0"
          >
            {{ product.name }}
          </h3>

          <span class="flex-1 border-gold-500/20 group-hover:border-gold-500/50 border-b group-hover:border-solid border-dotted transition-colors -translate-y-0.75 duration-500" />

          <span class="font-light tabular-nums text-ivory-950 text-sm whitespace-nowrap shrink-0">
            {{ formatCurrency(product.variant[0].price) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
