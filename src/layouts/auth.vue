<script lang="ts" setup>

</script>

<template>
  <UMain>
    <div class="top-8 left-8 z-10 absolute">
      <UButton
        icon="i-lucide-arrow-left"
        color="primary"
        variant="solid"
        to="/"
        aria-label="Back to Home"
        class="bg-black backdrop-blur-sm rounded-full cursor-pointer"
      />
    </div>

    <slot />
  </UMain>
</template>

<style scoped>

</style>
