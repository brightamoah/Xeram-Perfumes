<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
  {
    to: '/shop/all-products',
    label: 'All Products',
  },
  {
    to: '/impressions',
    label: 'Xeram Impressions',
  },
  {
    to: '/originals',
    label: 'Xeram Originals',
  },
])

const products = ref([
  {
    image: 'https://framerusercontent.com/images/ug0vkWyQY3f0lCoBGqtMyZOOX8.png', // Replace with actual image URL
    label: '50ml collection',
  },
  {
    image: 'https://framerusercontent.com/images/M9w1f2fEVtJVeeq8GvA4qKno.png', // Replace with actual image URL
    label: '80ml collection',
  },
  {
    image: 'https://framerusercontent.com/images/P7Vm4OSclayi0pb1ozvC9h3W64.png', // Replace with actual image URL
    label: '100ml collection',
  },
])
</script>

<template>
  <div class="mt-9 flex w-full flex-col items-center gap-8">
    <!-- Navigation Buttons -->
    <!-- <nav class="nav flex max-w-full items-center justify-center p-4">
      <ul class="flex items-center justify-center gap-4 md:gap-6">
        <li v-for="link in links" :key="link.label">
          <router-link
            :to="link.to"
            class="inline-block min-w-[120px] rounded-full border-2 px-3 py-2 text-center text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-black hover:text-white md:min-w-[160px] md:px-6 md:py-3 md:text-base dark:hover:bg-white dark:hover:text-black"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </nav> -->

    <div class="flex items-center justify-center space-x-2 md:space-x-8">
      <UButton
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        :label="link.label"
        variant="link"
        color="neutral"
        class="inline-block min-w-[90px] rounded-full border-2 border-(--ui-border-inverted) px-3 py-3.5 text-center text-xs font-bold whitespace-nowrap text-(--ui-text-highlighted) transition-all duration-300 hover:bg-black hover:text-white md:min-w-[160px] md:px-6 md:py-3 md:text-base md:font-medium dark:hover:bg-white dark:hover:text-black"
      />
    </div>

    <!-- Product Cards - Now properly centered -->
    <div
      class="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="product in products"
        :key="product.label"
        class="mt-10 flex flex-col items-center justify-between overflow-hidden rounded border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="aspect-square w-full overflow-hidden">
          <img
            decoding="async"
            :src="product.image"
            :alt="product.label"
            class="h-full w-full object-cover"
          />
        </div>

        <p class="py-4 text-center text-lg font-medium">
          {{ product.label }}
        </p>
      </div>
    </div>

    <WhyChooseUs />

    <CollectionSection />
    <DeliveryText />
    <FAQ />
  </div>
</template>
