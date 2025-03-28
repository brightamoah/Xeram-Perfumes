<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { ref } from 'vue'

const items = ref<AccordionItem[]>([
  {
    label: 'Icons',
    icon: 'i-lucide-smile',
    content: 'You have nothing to do, @nuxt/icon will handle it automatically.',
  },
  {
    label: 'Colors',
    icon: 'i-lucide-swatch-book',
    content: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    content:
      'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
  },
])
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-5xl font-light text-(--ui-text-highlighted)">FAQ</h3>
  </div>

  <UAccordion
    :items="items"
    class="w-[95%] md:w-[80%] bg-(--ui-bg-elevated) p-6 rounded-4xl"
    :ui="{
      label: 'text-lg font-bold',
      content: 'text-base',
      item: ' border-(--ui-border-accented)',
    }"
  />
</template>
