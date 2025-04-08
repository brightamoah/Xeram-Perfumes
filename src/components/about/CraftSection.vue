<script setup lang="ts">
import { ref } from 'vue'

// Image source (replace with the actual path to your image)
const fragranceImage = ref<string>('/img/about3.png')
</script>

<template>
  <section class="container mx-auto px-4 py-12 md:py-16">
    <div class="flex flex-col items-center gap-8 md:flex-row md:gap-12">
      <!-- Text Section -->
      <div class="w-full text-center md:w-1/2 md:text-left">
        <h1
          class="mb-4 text-left text-3xl leading-tight font-light text-(--ui-text-highlighted) md:text-3xl"
        >
          Crafting Luxury Fragrances with Unmatched Precision and Quality
        </h1>
        <p class="mb-8 text-base leading-relaxed">
          At Xeram Perfumes, we believe that every scent tells a story. Our commitment to excellence
          is reflected in the meticulous attention to detail in every fragrance we create.
        </p>

        <!-- Features Section -->
        <div class="grid grid-cols-1 gap-6 md:mt-15 md:grid-cols-2">
          <!-- Quality Materials -->
          <div>
            <h3 class="mb-2 text-lg font-medium text-(--ui-text-highlighted) md:text-xl">
              Quality Materials
            </h3>
            <p class="text-sm leading-relaxed md:text-base">
              We source only the finest ingredients to ensure an exceptional olfactory experience.
            </p>
          </div>

          <!-- Artisan Craftsmanship -->
          <div>
            <h3 class="mb-2 text-lg font-medium text-(--ui-text-highlighted) md:text-xl">
              Artisan Craftsmanship
            </h3>
            <p class="text-sm leading-relaxed md:text-base">
              Our expert artisans pour their heart into each bottle, ensuring unmatched quality and
              elegance.
            </p>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-full md:w-1/2">
        <div class="aspect-auto overflow-hidden rounded-xl shadow-lg">
          <img
            :src="fragranceImage"
            alt="Artisan fragrance crafting"
            class="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
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

  .leading-tight {
    line-height: 1.2;
  }

  .grid-cols-1 {
    gap: 2rem; /* Increase gap for better spacing on mobile */
  }
}
</style>
