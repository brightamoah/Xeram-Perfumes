<script setup lang="ts"></script>

<template>
  <div class="w-full h-[68vh] flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-(--ui-text-highlighted) mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-2">Oops! Page not found</h2>
      <p class="mb-6">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <UButton
        to="/"
        variant="solid"
        color="neutral"
        class="rounded-full px-6 py-3 font-medium shadow-md transition-all"
      >
        Go Back To Home
      </UButton>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
