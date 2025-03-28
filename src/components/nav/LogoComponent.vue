<script setup lang="ts"></script>

<template>
  <section class="flex items-center justify-center">
    <RouterLink :to="{ name: 'home' }">
      <img
        src="https://framerusercontent.com/images/sQCmgYexIataswnwC1ra5wB4nNc.png"
        alt="logo"
        class="logo dark:bg-white dark:rounded-2xl pt-3 h-10 w-40 md:h-15"
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
