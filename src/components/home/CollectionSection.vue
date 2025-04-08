<template>
  <div class="flex w-full justify-center bg-cream py-16">
    <div class="max-w-5xl px-4 text-center">
      <h3 class="p-2 text-3xl font-light text-black">Collection</h3>

      <h2 class="mb-4 p-2 text-3xl font-semibold text-black">
        Explore Our Exquisite Perfume Collections
      </h2>

      <p class="mb-8 p-3 text-center text-base text-gray-800 transition-all duration-300 md:p-6">
        Discover our diverse range of perfume collections, each crafted to evoke emotion and
        allure.<br />
        From luxurious originals to captivating impressions, there's a scent for every preference.
      </p>

      <div class="col-group grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-15">
        <div
          v-for="(collection, index) in collections"
          :key="index"
          class="flex flex-col items-center p-4 text-center text-gray-800"
        >
          <img :src="collection.image" alt="box" class="h-20 w-20 object-cover" />

          <h3 class="mt-4 p-2 text-lg font-semibold">{{ collection.title }}</h3>
          <p class="mt-2 text-gray-800">{{ collection.description }}</p>
        </div>
      </div>

      <UButton
        class="rounded-full border-2 border-black bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
      >
        Browse All Products
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Collection } from '@/types/types'
import { ref } from 'vue'

const collections = ref<Collection[]>([
  {
    title: 'Experience the richness of our original perfume oils.',
    description: 'Originals: Authentic Scents for True Connoisseurs',
    image: 'https://framerusercontent.com/images/oo2oVITpTmAC4RQ655iRj2GBs.png',
  },
  {
    title: 'Impressions: Affordable Luxury for Every Occasion',
    description: 'Enjoy the essence of luxury at an accessible price.',
    image: 'https://framerusercontent.com/images/oo2oVITpTmAC4RQ655iRj2GBs.png',
  },
  {
    title: 'Order Your Favorite Scents Easily via WhatsApp.',
    description: 'We offer a variety of bottle sizes to meet your personal preferences.',
    image: 'https://framerusercontent.com/images/oo2oVITpTmAC4RQ655iRj2GBs.png',
  },
])
</script>

<style scoped>
.col-group {
  margin-bottom: 2rem;
}
</style>
