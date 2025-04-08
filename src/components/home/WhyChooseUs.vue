<template>
  <section class="whe-sec mx-auto max-w-6xl space-y-4 px-4 py-16 dark:text-white">
    <h2 class="title text-center text-4xl font-light">Why Choose Xeram?</h2>

    <div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
      <div v-for="(item, index) in sections" :key="index" class="flex flex-col">
        <div class="mb-6 h-64 overflow-hidden md:h-80">
          <img
            decoding="async"
            loading="lazy"
            :sizes="item.imageSizes"
            :srcset="item.imageSrcset"
            :src="item.imageSrc"
            :alt="item.imageAlt"
            class="h-full w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
        <h3 class="p-2 text-2xl font-medium">{{ item.title }}</h3>
        <p class="p-3 text-left text-lg font-light">
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sections = [
  {
    title: 'Quality Ingredients',
    description:
      'We use only the highest quality ingredients to create long-lasting, memorable fragrances.',
    imageSrc: 'https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg',
    imageAlt: 'Premium tea leaves - quality ingredients',
    imageSizes: '323px',
    imageSrcset: `
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg?scale-down-to=512   512w,
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg?scale-down-to=1024 1024w,
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg?scale-down-to=2048 2048w,
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg                    3728w
    `,
  },
  {
    title: 'Elegant Packaging',
    description:
      'Our perfumes come in beautifully designed bottles that reflect the luxury and sophistication of our brand.',
    imageSrc: 'https://framerusercontent.com/images/jvqNza44F7fQUg6Edvsm3jYfH5w.jpg',
    imageAlt: 'Perfume bottle with elegant packaging',
    imageSizes: '323px',
    imageSrcset: `
      https://framerusercontent.com/images/jvqNza44F7fQUg6Edvsm3jYfH5w.jpg?scale-down-to=1024  768w,
      https://framerusercontent.com/images/jvqNza44F7fQUg6Edvsm3jYfH5w.jpg                    1125w
    `,
  },
]
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 2rem;
}

.whe-sec {
  font-weight: lighter;
}
</style>
