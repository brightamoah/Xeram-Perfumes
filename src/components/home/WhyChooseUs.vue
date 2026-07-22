<script setup lang="ts">
import { onMounted } from "vue";

const sections = [
  {
    title: "The Art of Fine Ingredients",
    description:
      "We source only the most exceptional ingredients from around the world — rare florals, aged ouds, and precious resins. Each note is chosen with an obsessive attention to quality, creating fragrances that last and linger.",
    imageSrc: "https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg",
    imageAlt: "Premium ingredients for luxury perfume",
    imageSrcset: `
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg?scale-down-to=512   512w,
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg?scale-down-to=1024 1024w,
      https://framerusercontent.com/images/hZO0MufL7NSCybZu8aAGxj2v0s.jpg                    3728w
    `,
  },
  {
    title: "Elegance in Every Bottle",
    description:
      "Our bottles are designed as objects of desire — each one a sculptural testament to luxury. Gold-accented glass vessels that sit on your vanity as a statement of refined taste.",
    imageSrc: "https://framerusercontent.com/images/jvqNza44F7fQUg6Edvsm3jYfH5w.jpg",
    imageAlt: "Luxury perfume bottle with elegant packaging",
    imageSrcset: `
      https://framerusercontent.com/images/jvqNza44F7fQUg6Edvsm3jYfH5w.jpg?scale-down-to=1024  768w,
      https://framerusercontent.com/images/jvqNza44F7fQUg6Edvsm3jYfH5w.jpg                    1125w
    `,
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
});
</script>

<template>
  <section class="w-full overflow-hidden why-section">
    <!-- Section Header -->
    <div class="bg-ivory dark:bg-obsidian px-6 py-20 text-center reveal-on-scroll">
      <p class="mb-4 font-light text-[10px] text-gold uppercase tracking-[0.5em]">
        Our Promise
      </p>

      <h2 class="mb-6 font-display font-light text-obsidian dark:text-ivory text-4xl md:text-6xl tracking-wide">
        Why Choose Xeram
      </h2>

      <div class="mx-auto gold-divider" />
    </div>

    <!-- Editorial Alternating Blocks -->
    <div
      v-for="(item, index) in sections"
      :key="index"
      class="editorial-block grid grid-cols-1 md:grid-cols-2 min-h-[70vh] reveal-on-scroll"
      :class="index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''"
    >
      <!-- Image Side -->
      <div class="relative overflow-hidden editorial-image">
        <img
          decoding="async"
          loading="lazy"
          :srcset="item.imageSrcset"
          :src="item.imageSrc"
          :alt="item.imageAlt"
          class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
        >
        <!-- Gold overlay shimmer -->
        <div class="absolute inset-0 bg-linear-to-t from-obsidian/40 via-transparent to-transparent" />
        <!-- Decorative numeral -->
        <div class="top-8 md:top-12 right-8 md:right-12 absolute">
          <span class="font-display text-ivory/20 select-none editorial-numeral">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- Text Side -->
      <div
        class="flex flex-col justify-center px-10 md:px-16 py-16 md:py-24 editorial-text"
        :class="index % 2 === 0 ? 'bg-ivory dark:bg-obsidian' : 'bg-cream dark:bg-charcoal'"
      >
        <p class="mb-6 font-light text-[9px] text-gold uppercase tracking-[0.5em]">
          0{{ index + 1 }} — Excellence
        </p>

        <h3 class="mb-8 font-display font-light text-obsidian dark:text-ivory text-3xl md:text-4xl lg:text-5xl leading-tight">
          {{ item.title }}
        </h3>

        <div
          class="mb-8 gold-divider"
          style="margin-left: 0; margin-right: auto;"
        />

        <p class="max-w-md font-light text-ash dark:text-smoke text-sm leading-loose">
          {{ item.description }}
        </p>

        <div class="mt-10">
          <RouterLink
            to="/shop"
            class="group inline-flex items-center gap-3 font-light text-[10px] text-ivory-950 uppercase tracking-[0.3em] editorial-cta"
          >
            <span class="group-hover:text-gold-500 transition-colors duration-300">Discover More</span>

            <span class="text-gold-500 transition-transform group-hover:translate-x-2 duration-300 editorial-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-section {
  background-color: #f5f0eb;
}
.dark .why-section {
  background-color: #0a0a0a;
}

.editorial-image {
  min-height: 60vw;
}
@media (min-width: 768px) {
  .editorial-image {
    min-height: unset;
  }
}

.editorial-numeral {
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.04em;
}

.bg-ivory {
  background-color: #f5f0eb;
}
.bg-cream {
  background-color: #f0ebe4;
}
.bg-obsidian {
  background-color: #0a0a0a;
}
.bg-charcoal {
  background-color: #1a1a1a;
}
.text-obsidian {
  color: #0a0a0a;
}
.text-ivory {
  color: #f5f0eb;
}
.text-gold {
  color: #c9a84c;
}
.text-ash {
  color: #888888;
}
.text-smoke {
  color: #bbbbbb;
}

.gold-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, #c9a84c, transparent);
}
</style>
