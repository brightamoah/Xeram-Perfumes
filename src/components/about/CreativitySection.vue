<template>
  <section class="w-full overflow-hidden">
    <!-- Desktop Version  -->
    <div
      class="flex-start container mt-15 ml-10 hidden h-[30rem] max-w-7xl items-center px-6 py-16 md:flex"
    >
      <div class="w-1/2 pr-8">
        <img
          src="/img/about2.avif"
          alt="Xeram Perfumes Ingredients"
          class="h-[25rem] w-full rounded-lg object-cover shadow-lg"
        />
      </div>
      <div class="w-1/2 pl-8">
        <h1 class="mb-6 w-[70%] text-3xl leading-tight font-light">
          Where Modern Creativity Meets Timeless Cultural Heritage in Fragrance
        </h1>
        <p class="mb-8 w-[85%] text-base">
          At Xeram Perfumes, we blend innovative artistry with the rich traditions of scent-making.
          Our luxurious fragrances are crafted to evoke deep emotional connections, celebrating both
          contemporary style and cultural richness.
        </p>
      </div>
    </div>

    <!-- Mobile Version  -->
    <div class="container mx-auto mt-8 px-4 py-8 md:hidden">
      <div class="mb-6">
        <h1 class="mb-4 w-[80%] text-2xl leading-tight font-medium">
          Where Modern Creativity Meets Timeless Cultural Heritage in Fragrance
        </h1>
        <p class="mb-10 w-[90%] text-base">
          At Xeram Perfumes, we blend innovative artistry with the rich traditions of scent-making.
          Our luxurious fragrances are crafted to evoke deep emotional connections, celebrating both
          contemporary style and cultural richness.
        </p>
      </div>
      <div class="mt-4 overflow-hidden rounded-lg px-4 shadow-lg">
        <img
          src="/img/about2.avif"
          alt="Xeram Perfumes Ingredients"
          class="h-90 w-full rounded-lg object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, watch } from 'vue'

const { width } = useWindowSize()

const isMobile = computed(() => width.value < 768)

watch(isMobile, (newValue) => {
  console.log('Is mobile:', newValue)
})
</script>

<style scoped>
/* Custom animations or transitions can be added here */
</style>
