<template>
  <div class="flex w-full justify-center py-16">
    <div class="w-full max-w-6xl px-4">
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h3 class="p-2 text-3xl font-light">{{ title }}</h3>
        <h2 class="mt-3 mb-4 p-2 text-4xl font-light text-gray-900">
          {{ subtitle }}
        </h2>
        <div class="flex justify-center">
          <p class="p-4 text-xl">
            At Xeram Perfumes, we ensure your favorite scents reach you swiftly.
            <span class="font-bold text-(--ui-text-highlighted)">Our FedEx delivery service</span>
            covers all parts of the country, providing you with timely and dependable shipping.
          </p>
        </div>
      </div>

      <!-- Delivery Features -->
      <div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          v-for="feature in deliveryFeatures"
          :key="feature.title"
          class="flex flex-col items-center space-y-6"
        >
          <div class="mx-auto w-full max-w-md">
            <img
              :src="feature.image"
              :srcset="feature.srcSet"
              :alt="feature.imageAlt"
              class="h-64 w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
          <div class="text-center">
            <h3 class="mt-4 mb-4 text-center text-2xl text-(--ui-text-highlighted)">
              {{ feature.title }}
            </h3>
            <p class="description text-base">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Delivery } from '@/types/types'
import { ref } from 'vue'

const title = ref('Delivery')
const subtitle = ref('Fast and Reliable Delivery Across the Nation')

const deliveryFeatures = ref<Delivery[]>([
  {
    title: 'Shipping Made Simple and Efficient',
    description: 'Enjoy hassle-free delivery with tracking options.',
    image: 'https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png',
    srcSet:
      'https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png?scale-down-to=512 512w,https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png 1481w',
    imageAlt: 'Shipping boxes and delivery truck',
  },
  {
    title: 'Delivery Timeframes You Can Count On',
    description: 'Most orders arrive within 3-5 business days.',
    image: 'https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png',
    srcSet:
      'https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png?scale-down-to=512 512w,https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png 1481w',
    imageAlt: 'Delivery route with time markers',
  },
  {
    title: 'Your Satisfaction is Our Priority',
    description: 'We strive to make your shopping experience seamless.',
    image: 'https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png',
    srcSet:
      'https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png?scale-down-to=512 512w,https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png 1481w',
    imageAlt: 'Packages delivered to door',
  },
])
</script>

<style scoped>
.description {
  margin-top: 1rem;
}
</style>
