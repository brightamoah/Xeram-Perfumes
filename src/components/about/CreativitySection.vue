<script setup lang="ts">
// import { useWindowSize } from "@vueuse/core";
</script>

<template>
  <section class="w-full overflow-hidden">
    <!-- Desktop Version  -->
    <div class="hidden md:flex flex-start items-center mt-15 ml-10 px-6 py-16 max-w-7xl h-120 container">
      <div class="pr-8 w-1/2">
        <img
          src="/img/about2.avif"
          alt="Xeram Perfumes Ingredients"
          class="shadow-lg rounded-lg w-full h-100 object-cover"
        >
      </div>

      <div class="pl-8 w-1/2">
        <h1 class="mb-6 w-[85%] font-medium text-highlighted text-2xl md:text-3xl leading-tight tracking-wide">
          Where Modern Creativity Meets Timeless Cultural Heritage in Fragrance
        </h1>

        <p class="mb-8 md:max-w-[85%] font-light text-base md:text-base">
          At Xeram Perfumes, we blend innovative artistry with the rich traditions of scent-making.
          Our luxurious fragrances are crafted to evoke deep emotional connections, celebrating both
          contemporary style and cultural richness.
        </p>
      </div>
    </div>

    <!-- Mobile Version  -->
    <div class="md:hidden mx-auto mt-8 px-4 py-8 container">
      <div class="mb-6">
        <h1 class="mb-4 w-[80%] font-medium text-2xl leading-tight">
          Where Modern Creativity Meets Timeless Cultural Heritage in Fragrance
        </h1>

        <p class="mb-10 w-[90%] text-base">
          At Xeram Perfumes, we blend innovative artistry with the rich traditions of scent-making.
          Our luxurious fragrances are crafted to evoke deep emotional connections, celebrating both
          contemporary style and cultural richness.
        </p>
      </div>

      <div class="shadow-lg mt-4 px-4 rounded-lg overflow-hidden">
        <img
          src="/img/about2.avif"
          alt="Xeram Perfumes Ingredients"
          class="rounded-lg w-full h-90 object-center object-cover hover:scale-105 transition-transform duration-300"
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom animations or transitions can be added here */
</style>
