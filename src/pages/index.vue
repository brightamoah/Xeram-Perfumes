<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const links = ref([
  { to: "/shop", label: "All Products" },
  { to: "/impressions", label: "Xeram Impressions" },
  { to: "/originals", label: "Xeram Originals" },
]);

const products = ref([
  {
    image: "https://framerusercontent.com/images/ug0vkWyQY3f0lCoBGqtMyZOOX8.png",
    label: "50ml Collection",
    subtitle: "The Intimate",
  },
  {
    image: "https://framerusercontent.com/images/M9w1f2fEVtJVeeq8GvA4qKno.png",
    label: "80ml Collection",
    subtitle: "The Classic",
  },
  {
    image: "https://framerusercontent.com/images/P7Vm4OSclayi0pb1ozvC9h3W64.png",
    label: "100ml Collection",
    subtitle: "The Statement",
  },
]);

// Scroll reveal
const heroRef = ref<HTMLElement | null>(null);
const parallaxOffset = ref(0);

function onScroll() {
  parallaxOffset.value = window.scrollY * 0.45;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });

  // Intersection observer for scroll reveals
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="flex flex-col items-center w-full home-page">
    <!-- ═══════════════ HERO SECTION ═══════════════ -->
    <section
      ref="heroRef"
      class="top-0 relative w-full overflow-hidden"
      style="height: 100dvh; min-height: 740px;"
    >
      <!-- Parallax Image -->
      <div
        class="absolute inset-0 w-full h-full"
        :style="{ transform: `translateY(${parallaxOffset}px) scale(1.15)`, transformOrigin: 'center top' }"
      >
        <img
          src="/hero.png"
          alt="Xeram Premium Perfume"
          class="w-full h-full object-cover"
        >
      </div>

      <!-- Overlay gradients -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      <!-- Gold particle shimmer overlay -->
      <div class="absolute inset-0 pointer-events-none shimmer-overlay" />

      <!-- Hero Content -->
      <div class="z-10 relative flex flex-col justify-center items-center px-6 h-full text-center">
        <p class="opacity-0 backdrop-blur-xs mb-4 rounded-full font-light text-primary text-xs uppercase tracking-[0.5em] animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
          Xeram Original Collection
        </p>

        <!-- Main headline -->
        <h1 class="opacity-0 font-display animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.45s_forwards] hero-headline">
          <span class="block text-neutral-50">Signature</span>

          <span class="block text-gold-500-shimmer italic">Scents</span>
        </h1>

        <!-- Gold divider -->
        <div class="opacity-0 my-8 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.75s_forwards] gold-divider" />

        <!-- Subheadline -->
        <p class="opacity-0 mb-10 font-light text-ivory-50/70 text-xs uppercase tracking-[0.25em] animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.9s_forwards] hero-sub">
          Crafted for the connoisseur
        </p>

        <!-- CTA Button -->
        <div class="opacity-0 shadow-md animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.05s_forwards]">
          <RouterLink
            to="/shop"
            class="px-12 py-4 luxury-btn"
          >
            Explore Collection
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="bottom-8 left-1/2 absolute flex flex-col items-center gap-2 opacity-0 -translate-x-1/2 animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.4s_forwards]">
        <span class="font-light text-[9px] text-ivory-50/50 uppercase tracking-[0.4em]">Scroll</span>

        <div class="scroll-line" />
      </div>
    </section>

    <!-- ═══════════════ CATEGORY NAVIGATION ═══════════════ -->
    <section class="bg-ivory-50 py-14 border-gold-500/10 border-b w-full reveal-on-scroll">
      <div class="flex flex-wrap justify-center items-center gap-10">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="font-light text-ivory-500 :text-ivory-50 hover:text-ivory-950 text-xs uppercase tracking-[0.3em] transition-colors duration-300 cat-link"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </section>

    <!-- ═══════════════ COLLECTION GRID ═══════════════ -->
    <section class="grid grid-cols-1 md:grid-cols-3 w-full reveal-on-scroll">
      <div
        v-for="(product, i) in products"
        :key="product.label"
        class="group relative overflow-hidden cursor-pointer product-card"
        :style="{ animationDelay: `${i * 0.15}s` }"
      >
        <!-- Image -->
        <div class="w-full aspect-[3/4] overflow-hidden">
          <img
            decoding="async"
            loading="lazy"
            :src="product.image"
            :alt="product.label"
            class="p-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1.5s] mix-blend-multiply"
          >
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-ivory-500/0 group-hover:bg-ivory-950/20 transition-all duration-700" />

        <!-- Gold shimmer border on hover -->
        <div class="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-700 pointer-events-none" />

        <!-- Label -->
        <div class="right-0 bottom-0 left-0 absolute p-8 transition-transform translate-y-2 group-hover:translate-y-0 duration-500">
          <div class="bg-ivory-50/90 backdrop-blur-sm p-6 border-gold-500/20 border-t text-center">
            <p class="mb-1 font-light text-[9px] text-ivory-500 uppercase tracking-[0.3em]">
              {{ product.subtitle }}
            </p>

            <p class="font-display font-light text-ivory-950 text-lg tracking-wide">
              {{ product.label }}
            </p>

            <div class="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 mt-3 transition-opacity duration-500">
              <span class="font-light text-[9px] text-gold-500 uppercase tracking-[0.3em]">View Collection</span>

              <span class="text-gold-500 text-xs">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section components -->
    <WhyChooseUs id="why-choose"/>

    <CollectionSection id="collection"/>

    <DeliveryText id="delivery"/>

    <FAQ id="faq"/>
  </div>
</template>

<style scoped>
.home-page {
  background-color: var(--color-ivory, #f5f0eb);
}
.dark .home-page {
  background-color: var(--color-obsidian, #0a0a0a);
}

/* Shimmer particle overlay */
.shimmer-overlay {
  background-image:
    radial-gradient(circle at 20% 80%, rgba(201, 168, 76, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(232, 213, 163, 0.03) 0%, transparent 60%);
}

/* Hero headline */
.hero-headline {
  font-size: clamp(3.5rem, 12vw, 9rem);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 0;
}

.text-ivory-50 {
  color: #f5f0eb;
}
.text-gold-500 {
  color: #c9a84c;
}
.text-ivory-500 {
  color: #888888;
}

.text-gold-500-shimmer {
  background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 40%, #a07830 80%, #c9a84c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Scroll line */
.scroll-line {
  width: 1.5px;
  height: 70px;
  background: linear-gradient(180deg, rgba(201, 168, 76, 0.8), transparent);
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(0.7);
    opacity: 0.5;
  }
}

/* Category links */
.cat-link {
  position: relative;
  padding-bottom: 4px;
}
.cat-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #c9a84c;
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cat-link:hover::after {
  transform: scaleX(1);
}

/* Product card border on grid */
.product-card {
  border-right: 1px solid rgba(201, 168, 76, 0.1);
  border-bottom: 1px solid rgba(201, 168, 76, 0.1);
}
.product-card:last-child {
  border-right: none;
}

/* Color tokens */
.bg-ivory-50 {
  background-color: #f5f0eb;
}
.bg-ivory-950 {
  background-color: #0a0a0a;
}
.bg-ivory-100 {
  background-color: #f0ebe4;
}
.bg-ivory-900 {
  background-color: #1a1a1a;
}
.border-gold-500 {
  border-color: #c9a84c;
}
.dark .bg-ivory-950 {
  background-color: #0a0a0a;
}

.page-bg {
  background-image: url("./img/about3.webp");
}
</style>
