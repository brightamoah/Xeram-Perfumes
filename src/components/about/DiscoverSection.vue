<template>
  <section class="relative flex justify-center items-center mx-auto mt-10 mb-5 w-[90%] md:w-[75%]">
    <!-- Background Image Banner -->
    <div class="relative rounded-lg w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      <img
        src="/img/discover.avif"
        alt="Xeram Luxury Fragrances"
        class="w-full h-full object-cover"
      >

      <!-- Overlay to darken the image and improve text readability -->
      <div class="absolute inset-0 bg-black/50 bg-opacity-40" />

      <!-- Content Container -->
      <div class="absolute inset-0 flex flex-col justify-center items-center px-4 md:px-8 text-center">
        <!-- Main Heading -->
        <h2 class="mb-3 md:mb-4 font-light text-white text-3xl md:text-4xl lg:text-5xl">
          Discover Our Exquisite Fragrances
        </h2>

        <!-- Subheading -->
        <p class="opacity-90 mb-8 md:mb-10 max-w-2xl font-light text-white text-sm md:text-base lg:text-lg">
          Explore our luxurious collection or contact us for personalized fragrance recommendations
          and inquiries.
        </p>

        <!-- Call-to-Action Button -->
        <UButton
          variant="link"
          to="/shop"
          exact-active-class="active"
          class="px-6 md:px-8 py-2 md:py-3 border rounded-full md:text-base transition-colors duration-300 luxury-btn"
        >
          Browse All Products
        </UButton>
      </div>
    </div>
  </section>
</template>
