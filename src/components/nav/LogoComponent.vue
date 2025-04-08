<script setup lang="ts"></script>

<template>
  <section class="flex items-center justify-center">
    <RouterLink :to="{ name: 'home' }">
      <img
        src="https://framerusercontent.com/images/sQCmgYexIataswnwC1ra5wB4nNc.png"
        alt="logo"
        class="logo h-10 w-40 pt-3 md:h-15 dark:rounded-2xl dark:bg-white"
      />
    </RouterLink>
  </section>
</template>

<style scoped>
.logo {
  border-radius: inherit;
  object-position: center center;
  object-fit: cover;
}
</style>
