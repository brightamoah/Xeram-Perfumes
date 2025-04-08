<script lang="ts" setup></script>

<template>
  <section class="container mx-auto px-4 py-8">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </section>
</template>

<style scoped>
/* Ensure images maintain aspect ratio */
</style>
