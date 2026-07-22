<script setup lang="ts">
import { ref } from "vue";

// Image source (replace with the actual path to your image)
const fragranceImage = ref<string>("/img/about3.png");
</script>

<template>
  <section class="mx-auto px-4 py-12 md:py-16 container">
    <div class="flex md:flex-row flex-col items-center gap-8 md:gap-12">
      <!-- Text Section -->
      <div class="w-full md:w-1/2 md:text-left text-center">
        <h1 class="mb-4 font-medium text-highlighted text-2xl md:text-3xl leading-tight tracking-wide">
          Crafting Luxury Fragrances with Unmatched Precision and Quality
        </h1>

        <p class="mb-8 font-light text-base leading-relaxed">
          At Xeram Perfumes, we believe that every scent tells a story. Our commitment to excellence
          is reflected in the meticulous attention to detail in every fragrance we create.
        </p>

        <!-- Features Section -->
        <div class="gap-6 grid grid-cols-1 md:grid-cols-2 md:mt-15">
          <!-- Quality Materials -->
          <div>
            <h3 class="mb-2 font-medium text-highlighted text-lg md:text-xl">
              Quality Materials
            </h3>

            <p class="font-light text-sm md:text-base leading-relaxed">
              We source only the finest ingredients to ensure an exceptional olfactory experience.
            </p>
          </div>

          <!-- Artisan Craftsmanship -->
          <div>
            <h3 class="mb-2 font-medium text-highlighted text-lg md:text-xl">
              Artisan Craftsmanship
            </h3>

            <p class="font-light text-sm md:text-base leading-relaxed">
              Our expert artisans pour their heart into each bottle, ensuring unmatched quality and
              elegance.
            </p>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-full md:w-1/2">
        <div class="shadow-lg rounded-xl aspect-auto overflow-hidden">
          <img
            :src="fragranceImage"
            alt="Artisan fragrance crafting"
            class="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-300"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth transitions and responsive behavior */
.container {
  max-width: 1200px;
}

/* Fine-tune image aspect ratio for smaller screens */
@media (max-width: 768px) {
  .aspect-w-4 {
    padding-bottom: 50%; /* Maintain 4:2 aspect ratio */
  }
}

/* Hover effect for image */
img {
  transition: transform 0.3s ease-in-out;
}

/* Adjust text alignment and spacing for smaller screens */
@media (max-width: 768px) {
  .text-center {
    text-align: center;
  }

  .grid-cols-1 {
    gap: 2rem; /* Increase gap for better spacing on mobile */
  }
}
</style>
