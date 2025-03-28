<script setup lang="ts">
//create a prop for the properties using ts
const props = defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const emit = defineEmits(['toggle-mobile-menu'])

//function to toggle the mobile menu
function toggleMobileMenu() {
  emit('toggle-mobile-menu')
}
</script>

<template>
  <div>
    <UButton
      class="mr-2 ml-auto flex items-center justify-center rounded-xl p-2 font-bold md:hidden"
      @click="toggleMobileMenu"
      variant="ghost"
      color="neutral"
    >
      <UIcon name="i-lucide-menu" class="size-8" v-if="!props.mobileMenuOpen" />

      <UIcon name="i-lucide-x" class="size-8" v-else />
    </UButton>
  </div>
</template>

<style scoped></style>
