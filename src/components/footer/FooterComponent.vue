<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

const scrollToTop = () => {
  console.log('Scrolling to top...')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const currentYear = useDateFormat(useNow(), 'YYYY')
</script>

<template>
  <footer class="flex flex-col items-center justify-center w-full p-10 space-y-4">
    <UButton
      label="Back to Top"
      variant="ghost"
      color="neutral"
      class="text-center cursor-pointer p-3 text-base rounded-full"
      @click="scrollToTop"
    />

    <USeparator
      size="xs"
      :ui="{
        border: 'border-(--ui-border-inverted)',
      }"
      class="w-full md:w-[80%]"
    />

    <div class="flex flex-col sm:flex-row justify-between w-full md:w-[80%] md:max-w-6xl">
      <p class="text-center">© {{ currentYear }} Xeram Perfumes. All rights reserved.</p>

      <div class="flex justify-center sm:justify-start gap-4 mt-4 sm:mt-0">
        <InstagramIcon class="size-5" />
        <WhatsAPP class="size-5" />
        <FaceBook class="size-5" />
        <TwitterIcon class="size-6" />
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
