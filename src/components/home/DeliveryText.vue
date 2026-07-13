<script setup lang="ts">
import { onMounted } from "vue";

const stats = [
  { value: "3-5", label: "Days Delivery" },
  { value: "100%", label: "Tracked Orders" },
  { value: "24/7", label: "Customer Care" },
];

const deliveryFeatures = [
  {
    title: "Effortless Shipping",
    description: "Enjoy hassle-free delivery with real-time FedEx tracking at every step of your journey.",
    image: "https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png",
    srcSet: "https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png?scale-down-to=512 512w,https://framerusercontent.com/images/n2NUaK4xoFVwf2wKvpZ8UyNMyQ.png 1481w",
    imageAlt: "Efficient shipping service",
    icon: "📦",
  },
  {
    title: "Guaranteed Timeframes",
    description: "Most orders arrive within 3-5 business days. We don't keep you waiting.",
    image: "https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png",
    srcSet: "https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png?scale-down-to=512 512w,https://framerusercontent.com/images/Yaro8KnhM5gPT9T5LlKAyQZ8Q4.png 1481w",
    imageAlt: "On-time delivery guarantee",
    icon: "⏱",
  },
  {
    title: "Your Satisfaction First",
    description: "Every order is handled with care. If anything falls short, we make it right. Always.",
    image: "https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png",
    srcSet: "https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png?scale-down-to=512 512w,https://framerusercontent.com/images/FcyyO7JK3b8rHcswo9ukJ2yK4E.png 1481w",
    imageAlt: "Customer satisfaction promise",
    icon: "✦",
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("revealed")),
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
});
</script>

<template>
  <section class="delivery-section w-full overflow-hidden">
    <!-- Dark cinematic header band -->
    <div class="bg-ivory-950 py-24 px-6 text-center reveal-on-scroll">
      <div class="gold-divider-full mb-16" />

      <p class="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-light mb-4">
        Our Promise
      </p>

      <h2 class="font-display text-4xl md:text-6xl font-light text-ivory-50 mb-6 tracking-wide">
        Swift. Secure. Delivered.
      </h2>

      <div class="gold-divider mx-auto mb-8" />

      <p class="text-sm font-light text-ivory-500 max-w-2xl mx-auto leading-loose">
        At Xeram Perfumes, your order is treated with the same care as the fragrance itself.
        Our <span class="text-gold-500-light">FedEx tracked delivery service</span> reaches every corner of the country
        with precision and elegance.
      </p>

      <div class="gold-divider-full mt-16" />
    </div>

    <!-- Stat Metrics -->
    <div class="bg-ivory-900 py-16 px-6 reveal-on-scroll">
      <div class="max-w-4xl mx-auto grid grid-cols-3 gap-0 divide-x divide-gold/15">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center px-6 py-4"
        >
          <p class="font-display text-4xl md:text-5xl font-light text-gold-500 mb-2">
            {{ stat.value }}
          </p>

          <p class="text-[9px] tracking-[0.3em] uppercase text-ivory-500 font-light">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>

    <!-- Feature Cards -->
    <div class="bg-ivory-950 pb-24 px-6 reveal-on-scroll">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
        <div
          v-for="feature in deliveryFeatures"
          :key="feature.title"
          class="delivery-card group bg-ivory-950 hover:bg-ivory-900 transition-colors duration-500 p-10 text-center"
        >
          <!-- Icon -->
          <div class="delivery-icon-wrap mx-auto mb-8">
            <span class="text-3xl">{{ feature.icon }}</span>
          </div>

          <!-- Image -->
          <div
            class="relative overflow-hidden mb-8"
            style="aspect-ratio: 16/9;"
          >
            <img
              :src="feature.image"
              :alt="feature.imageAlt"
              class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              :srcset="feature.srcSet"
            >

            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
          </div>

          <h3 class="font-display text-xl font-light text-ivory-50 mb-4 leading-snug">
            {{ feature.title }}
          </h3>

          <div class="gold-divider mx-auto mb-5" />

          <p class="text-xs text-ivory-500 font-light leading-loose">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.delivery-section {
  background-color: #0a0a0a;
}

.delivery-icon-wrap {
  width: 56px;
  height: 56px;
  border: 1px solid rgba(201, 168, 76, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.delivery-card {
  border: none;
}

.text-gold-500 {
  color: #c9a84c;
}
.text-gold-500-light {
  color: #e8d5a3;
}
.text-ivory-50 {
  color: #f5f0eb;
}
.text-ivory-500 {
  color: #888888;
}
.bg-ivory-950 {
  background-color: #0a0a0a;
}
.bg-ivory-900 {
  background-color: #1a1a1a;
}

.gold-divider {
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}
.gold-divider-full {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), transparent);
}
</style>
