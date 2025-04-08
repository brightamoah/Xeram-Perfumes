<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

const scrollToTop = () => {
  console.log('Scrolling to top...')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const currentYear = useDateFormat(useNow(), 'YYYY')
</script>

<template>
  <footer class="flex w-full flex-col items-center justify-center space-y-4 p-10">
    <UButton
      label="Back to Top"
      variant="subtle"
      color="neutral"
      class="cursor-pointer rounded-full p-3 text-center text-base"
      @click="scrollToTop"
    />

    <USeparator
      size="xs"
      :ui="{
        border: 'border-(--ui-border-inverted)',
      }"
      class="w-full md:w-[80%]"
    />

    <div class="flex w-full flex-col justify-between sm:flex-row md:w-[80%] md:max-w-6xl">
      <p class="text-center">&copy; {{ currentYear }} Xeram Perfumes. All rights reserved.</p>

      <div class="mt-4 flex justify-center gap-4 sm:mt-0 sm:justify-start">
        <InstagramIcon class="size-5" />
        <WhatsAPP class="size-5" />
        <FaceBook class="size-5" />
        <TwitterIcon class="size-6" />
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
