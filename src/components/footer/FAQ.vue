<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { ref } from 'vue'

// const items = ref<AccordionItem[]>([
//   {
//     label: 'Icons',
//     icon: 'i-lucide-smile',
//     content: 'You have nothing to do, @nuxt/icon will handle it automatically.',
//   },
//   {
//     label: 'Colors',
//     icon: 'i-lucide-swatch-book',
//     content: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
//   },
//   {
//     label: 'Components',
//     icon: 'i-lucide-box',
//     content:
//       'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
//   },
// ])

const faqs = ref<AccordionItem[]>([
  {
    label: 'What are your business hours?',
    content:
      'Our regular business hours are Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays and public holidays.',
  },
  {
    label: 'How can I schedule a consultation?',
    content:
      'You can schedule a consultation by filling out the contact form on this page, calling our office directly, or sending us an email. Our team will get back to you within 24 hours to confirm your appointment.',
  },
  {
    label: 'Do you offer virtual meetings?',
    content:
      'Yes, we offer virtual meetings via Zoom, Google Meet, or Microsoft Teams. Please indicate your preference for a virtual meeting when contacting us, and we will provide you with the necessary details.',
  },
  {
    label: 'What is your response time for inquiries?',
    content:
      'We aim to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our office directly for immediate assistance.',
  },
])
</script>

<template>
  <div class="w-[95%] md:w-[100%]">
    <h2 class="mb-8 text-center text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
    <UAccordion
      :items="faqs"
      :ui="{
        label: 'text-lg font-bold',
        content: 'text-lg font-medium',
        item: ' border-(--ui-border-accented)',
      }"
      class="mx-auto max-w-3xl rounded-4xl border-2 p-6"
    />
  </div>

  <!-- <div class="flex flex-col gap-4">
    <h3 class="text-center text-2xl font-light text-(--ui-text-highlighted) md:text-4xl">
      Frequently Asked Questions
    </h3>
  </div>

  <UAccordion
    :items="items"
    class="w-[95%] rounded-4xl bg-(--ui-bg-elevated) p-6 md:w-[80%]"
    :ui="{
      label: 'text-lg font-bold',
      content: 'text-base',
      item: ' border-(--ui-border-accented)',
    }"
  /> -->
</template>
