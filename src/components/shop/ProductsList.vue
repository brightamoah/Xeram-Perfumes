<script setup lang="ts">
import type { Product } from "@/types/types";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useProductStore } from "@/stores/ProductStore";

// const id = ref<number>(1)

// const formatCurrency = (value: number) => {
//   return new Intl.NumberFormat('en-GH', {
//     style: 'currency',
//     currency: 'GHS',
//     minimumFractionDigits: 2,
//   }).format(value)
// }

const productStore = useProductStore();

const { products } = storeToRefs(productStore);

// const products = ref<Product[]>([
//   {
//     id: id.value++,
//     name: 'Club De Nuit',
//     price: 39.99,
//     image: '/img/perf.png',
//     category: 'Xeram Originals',
//   },
//   {
//     id: id.value++,
//     name: 'Oud De Arabia',
//     price: 39.99,
//     image: '/img/perf2.png',
//     category: 'Xeram Impressions',
//   },
//   {
//     id: id.value++,
//     name: 'Asad',
//     price: 39.99,
//     image: '/img/perf3.png',
//     category: 'Xeram Originals',
//   },
//   {
//     id: id.value++,
//     name: 'Allure Homme',
//     price: 39.99,
//     image: '/img/perf4.png',
//     category: 'Xeram Impressions',
//   },
//   {
//     id: id.value++,
//     name: 'Chanel No 5',
//     price: 39.99,
//     image: '/img/perf5.png',
//     category: 'Xeram Impressions',
//   },
// ])

const categories = ref<string[]>(["All Product", "Xeram Impressions", "Xeram Originals"]);
const selectedCategory = ref<string>("All Product");

const filteredProducts = computed<Product[]>(() => {
  if (selectedCategory.value === "All Product") return products.value;
  return products.value.filter(product => product.category === selectedCategory.value);
});
</script>

<template>
  <div>
    <!-- Header Section -->
    <div class="mb-12 text-center">
      <h1 class="mb-2 font-light text-xl md:text-3xl">
        Check out our full collection of products tailored to your needs
      </h1>
    </div>

    <!-- Category Filters -->
    <div class="flex justify-center space-x-4 mb-8">
      <button
        v-for="category in categories"
        :key="category"
        class="rounded-full px-2.5 py-3 text-xs font-medium transition-colors duration-300 md:px-6 md:py-4 md:text-base"
        :class="[
          selectedCategory === category
            ? 'bg-(--ui-bg-inverted) text-white '
            : 'border border-(--ui-border-accented) bg-(--ui-bg) hover:bg-(--ui-bg-elevated)',
        ]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Product Grid -->
    <div
      v-auto-animate="{ duration: 400, easing: 'linear' }"
      class="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto w-[80%]"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="group relative flex flex-col"
      >
        <!-- Product Image -->
        <div
          class="relative rounded-lg w-full aspect-square aspect-w-1 overflow-hidden"
          @click="$router.push({
            name: '/shop/details/[id]/[variantId]',
            params: { id: product.id, variantId: product.variant[0].id },
          })"
        >
          <img
            :src="product.defaultImage"
            :alt="product.name"
            class="w-full h-full object-center object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
          >
          <!-- Add to Cart Button - Overlay -->
          <div class="absolute inset-0 flex justify-center items-center hover:bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
            <UButton
              variant="solid"
              color="neutral"
              class="bg-white opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-xl px-4 py-2.5 rounded-full font-semibold text-black text-sm scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer transform"
            >
              Add to Cart
            </UButton>
          </div>
        </div>

        <!-- Product Details -->
        <div class="flex md:flex-row flex-col justify-between items-center mt-2 md:mt-4 px-2">
          <h3 class="font-medium text-sm md:text-base cursor-pointer">
            {{ product.name }}
          </h3>
          <!-- <p class="font-medium text-sm md:text-base cursor-pointer">
            {{ formatCurrency(product.price) }}
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
