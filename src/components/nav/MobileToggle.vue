<script setup lang="ts">
// create a prop for the properties using ts
const props = defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "toggle-mobile-menu"): void;
}>();

// function to toggle the mobile menu
function toggleMobileMenu() {
  emit("toggle-mobile-menu");
}
</script>

<template>
  <div>
    <UButton
      class="sm:hidden flex justify-center items-center mr-2 ml-auto p-2 rounded-xl font-bold"
      variant="ghost"
      color="neutral"
      @click="toggleMobileMenu"
    >
      <UIcon
        v-if="!props.mobileMenuOpen"
        name="i-lucide-menu"
        class="size-8 text-black"
      />

      <UIcon
        v-else
        name="i-lucide-x"
        class="size-8 text-black"
      />
    </UButton>
  </div>
</template>

<style scoped></style>
