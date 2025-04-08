<template>
  <section class="relative mx-auto mt-10 mb-5 flex w-[90%] items-center justify-center md:w-[75%]">
    <!-- Background Image Banner -->
    <div class="relative h-64 w-full overflow-hidden rounded-lg md:h-80 lg:h-96">
      <img
        src="/img/discover.avif"
        alt="Xeram Luxury Fragrances"
        class="h-full w-full object-cover"
      />

      <!-- Overlay to darken the image and improve text readability -->
      <div class="bg-opacity-40 absolute inset-0 bg-black/50"></div>

      <!-- Content Container -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center px-4 text-center md:px-8"
      >
        <!-- Main Heading -->
        <h2 class="mb-3 text-3xl font-light text-white md:mb-4 md:text-4xl lg:text-5xl">
          Discover Our Exquisite Fragrances
        </h2>

        <!-- Subheading -->
        <p class="mb-8 max-w-2xl text-sm text-white opacity-90 md:mb-10 md:text-base lg:text-lg">
          Explore our luxurious collection or contact us for personalized fragrance recommendations
          and inquiries.
        </p>

        <!-- Call-to-Action Button -->
        <UButton
          variant="link"
          to="/shop"
          exact-active-class="active"
          class="focus:ring-opacity-50 rounded-full border border-white px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-gray-800 focus:ring-2 focus:ring-white focus:outline-none md:px-8 md:py-3 md:text-base"
        >
          Browse All Products
        </UButton>
      </div>
    </div>
  </section>
</template>
