<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const isLoaded = ref(false);

const FooterComponentLazy = defineAsyncComponent({
  loader: () => import("@/components/footer/FooterComponent.vue"),
});

const route = useRoute();

const layoutMap: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  default: defineAsyncComponent(() => import('./layouts/default.vue')),
  // dashboard: defineAsyncComponent(() => import('./layouts/dashboard.vue')),
  auth: defineAsyncComponent(() => import('./layouts/auth.vue')),
}


const layoutComponent = computed(() => {
  const name = (route.meta.layout as string) ?? 'default'
  return layoutMap[name] ?? layoutMap.default
})

onMounted(() => {
  isLoaded.value = true;
});
</script>

<template>
  <UApp>
    <!-- <New /> -->

    <!-- <NavBar /> -->

    <component :is="layoutComponent">
      <RouterView />
    </component>

    <!-- <FooterComponentLazy v-if="isLoaded" /> -->
  </UApp>
</template>

<style scoped></style>
