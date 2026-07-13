<script setup lang="ts"></script>

<template>
  <section class="flex justify-center items-center">
    <RouterLink :to="{ name: '/' }">
      <img
        src="https://framerusercontent.com/images/sQCmgYexIataswnwC1ra5wB4nNc.png"
        alt="logo"
        class=" pt-2  w-40 h-10 md:h-15 logo"
      >
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
