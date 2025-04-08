<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const isLoaded = ref(false)

const FooterComponentLazy = defineAsyncComponent({
  loader: () => import('@/components/footer/FooterComponent.vue'),
})

onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <UApp>
    <NavBar />
    <RouterView v-if="isLoaded" />
    <FooterComponentLazy v-if="isLoaded" />
  </UApp>
</template>

<style scoped></style>
