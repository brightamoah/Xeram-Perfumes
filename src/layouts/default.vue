<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const FooterComponentLazy = defineAsyncComponent({
  loader: () => import("@/components/footer/FooterComponent.vue"),
});
</script>

<template>
  <div>
    <New />

    <UMain>
      <slot />
    </UMain>

    <FooterComponentLazy />
  </div>
</template>

<style scoped>

</style>
