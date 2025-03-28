<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <UApp>
    <NavBar />
    <RouterView />
    <FooterComponent />
  </UApp>
</template>

<style scoped></style>
