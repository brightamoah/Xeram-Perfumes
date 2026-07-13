<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useProductStore } from "@/stores/ProductStore";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useProductStore();
const cartCount = computed(() => store.cartItemsCount);

const items = computed<NavigationMenuItem[]>(() => [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Reviews", to: "/reviews" },
]);

const navUi = {
  link: [
    "after:-bottom-0.5 after:h-px",
    "transition-[letter-spacing,color] duration-300 ease-out hover:tracking-[0.15em]",
    "after:transition-all after:duration-300 after:ease-out",
    "font-light text-xs uppercase tracking-wide",
  ].join(" "),
};

// --- Scroll-driven expansion ------------------------------------------
const isScrolled = ref(false);
const SCROLL_THRESHOLD = 48; // px before the header starts expanding

function handleScroll() {
  isScrolled.value = window.scrollY > SCROLL_THRESHOLD;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

// Shared luxury easing — a slow, confident settle rather than a linear snap
const LUX_EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";
</script>

<template>
  <!-- Fixed shell that handles the width transition via padding for flawlessly smooth resizing -->
  <div 
    class="top-0 z-50 fixed inset-x-0 flex justify-center transition-all duration-700 pointer-events-none"
    :class="[
      LUX_EASE,
      isScrolled ? 'px-0 pt-0' : 'px-4 lg:px-[15%] pt-3 lg:pt-5'
    ]"
  >
    <UHeader
      mode="drawer"
      toggle-side="left"
      :toggle="{ variant: 'link', size: 'xl', color: 'neutral' }"
      :menu="{ overlay: false, direction: 'top', modal: false }"
      :ui="{ content: 'lg:hidden mt-16', center: 'flex', root: 'w-full transition-all duration-700' }"
      class="border w-full overflow-hidden transition-all duration-700 pointer-events-auto"
      :class="[
        LUX_EASE,
        isScrolled
          ? 'rounded-none border-ivory-300/30 border-t-transparent border-x-transparent bg-ivory-100/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] px-6 lg:px-12 py-2'
          : 'rounded-lg border-white/60 bg-neutral-100/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] px-4 lg:px-8 py-2.5 lg:py-3.5',
      ]"
    >
      <template #left>
        <UNavigationMenu
          highlight
          variant="link"
          :items="items.slice(0, 3)"
          :ui="navUi"
          class="hidden lg:flex"
        />
      </template>

      <section
        class="flex flex-shrink-0 justify-center items-center transition-transform duration-700"
        :class="[LUX_EASE, isScrolled ? 'scale-90' : 'scale-100']"
      >
        <LogoComponent />
      </section>

      <template #right>
        <UNavigationMenu
          highlight
          variant="link"
          :items="items.slice(3)"
          :ui="navUi"
          class="hidden lg:flex"
        />

        <div class="flex items-center gap-2">
          <CartButton :cart-count="cartCount" />

          <UButton
            to="/login"
            variant="subtle"
            color="primary"
            size="sm"
            label="Login"
            icon="i-lucide-log-in"
            class="cursor-pointer luxury-btn"
          />
        </div>
      </template>

      <template #body>
        <UNavigationMenu
          highlight
          orientation="vertical"
          :items="items"
          class="-mx-2.5"
          :ui="{ link: 'font-light text-sm uppercase tracking-wide py-3' }"
        />
      </template>
    </UHeader>
  </div>

  <!-- Spacer so page content doesn't sit under the now-fixed header (Hidden on homepage to prevent blank space above hero) -->
  <div v-if="route.path !== '/'" aria-hidden="true" class="h-[76px] lg:h-[92px]" />
</template>

<style scoped></style>