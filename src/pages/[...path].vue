<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-[68vh]">
    <div class="text-center">
      <h1 class="mb-4 font-bold text-highlighted text-6xl">
        404
      </h1>

      <h2 class="mb-2 font-semibold text-2xl">
        Oops! Page not found
      </h2>

      <p class="mb-6">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <UButton
        to="/"
        variant="subtle"
        color="neutral"
        icon="i-lucide-house"
        class="font-medium transition-all luxury-btn"
        label="Back To Home"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
