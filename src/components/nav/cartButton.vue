<script lang="ts" setup>
defineProps<{
  cartCount: number;
  label?: string;
}>();
</script>

<template>
  <UButton
    to="/cart"
    variant="link"
    color="neutral"
    size="lg"
    icon="i-lucide-shopping-bag"
    :label="label"
    class="relative hover:bg-transparent p-2 hover:scale-110 transition-transform duration-200 cursor-pointer"
    :ui="{
      leadingIcon: 'size-5.5',
    }"
  >
    <template
      v-if="cartCount > 0"
      #trailing
    >
      <span class="-top-0.5 -right-0.5 absolute flex justify-center items-center bg-[#c9a84c] rounded-full min-w-4 h-4 font-medium text-[9px] text-black animate-[scale-in_150ms_ease-out]">
        {{ cartCount }}
      </span>
    </template>
  </UButton>
</template>
