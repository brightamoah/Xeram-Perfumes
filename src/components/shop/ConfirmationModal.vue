<script setup lang="ts">
import { computed, ref } from 'vue'

const open = ref(false)

const props = defineProps<{
  actionType: 'remove' | 'clear'
  item?: { name: string; size: string }
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const title = computed(() => {
  return props.actionType === 'remove' ? 'Remove Item' : 'Clear Cart'
})

const message = computed(() => {
  return props.actionType === 'remove'
    ? `Are you sure you want to remove <strong>${props.item?.name} (${props.item?.size})</strong> from your cart?`
    : 'Are you sure you want to clear all items from your cart?'
})

const confirmButtonText = computed(() => {
  return props.actionType === 'remove' ? 'Remove' : 'Clear'
})

const cancelButtonText = computed(() => {
  return 'Cancel'
})

const handleConfirm = () => {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" :title="title" :ui="{ footer: 'justify-end' }">
    <!-- <UButton label="Open" color="neutral" variant="subtle" /> -->

    <div>
      <UButton
        v-if="props.actionType === 'remove'"
        color="error"
        variant="soft"
        icon="i-heroicons-trash"
        class="transition-all hover:text-red-500"
      >
        Remove
      </UButton>

      <UButton
        v-else
        color="neutral"
        variant="subtle"
        leading-icon="i-carbon-shopping-cart-clear"
        class="rounded-full px-6 py-3 transition-all duration-200 hover:scale-105 hover:bg-(--ui-bg-muted) hover:text-(--ui-text-highlighted)"
      >
        Clear Cart
      </UButton>
    </div>

    <template #body>
      <p class="text-base text-(--ui-text)" v-html="message"></p>
    </template>

    <template #footer>
      <UButton
        :label="cancelButtonText"
        color="neutral"
        variant="subtle"
        @click="open = false"
        class="mr-2"
      />
      <UButton :label="confirmButtonText" @click="handleConfirm" variant="subtle" color="error" />
    </template>
  </UModal>
</template>
