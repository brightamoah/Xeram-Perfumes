<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { MenuItems } from "@/types/types";
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/ProductStore";

const router = useRouter();

const productStore = useProductStore();
const { cartItemsCount } = storeToRefs(productStore);

const scrolled = ref(false);
function onScroll() { scrolled.value = window.scrollY > 60; }
onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const menuItems = ref<NavigationMenuItem[]>([
  { label: "Home", to: { name: "/" } },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Reviews", to: "/reviews" },
]);

const mobileMenuItems = ref<MenuItems[]>([
  { label: "Home", route: { name: "/" } },
  { label: "Shop", route: { name: "/shop/" } },
  { label: "About", route: { name: "/about" } },
  { label: "Contact", route: { name: "/contact" } },
  { label: "Reviews", route: { name: "/reviews" } },
]);

const mobileMenuOpen = ref<boolean>(false);
const activeLink = ref<string | null>("home");
function setActiveLink() {
  activeLink.value = (router.currentRoute.value.name as string) ?? "home";
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

const mobileNav = useTemplateRef<HTMLElement>("mobileNav");

onClickOutside(mobileNav, (event) => {
  if (window.innerWidth <= 768 && mobileMenuOpen.value) {
    const clickedInsideMobileNav
      = mobileNav.value
        && mobileNav.value instanceof HTMLElement
        && mobileNav.value.contains(event.target as Node);
    if (!clickedInsideMobileNav) {
      mobileMenuOpen.value = false;
    }
  }
});

const displayCartItemCount = computed(() => {
  return cartItemsCount.value > 99 ? "99+" : cartItemsCount.value.toString();
});

watch(
  () => router.currentRoute.value.name,
  () => {
    setActiveLink();
    mobileMenuOpen.value = false;
  },
  { immediate: true },
);

onMounted(() => {
  setActiveLink();
});
</script>

<template>
  <header
    class="top-0 z-50 sticky w-full transition-all duration-500 navbar-luxury"
    :class="scrolled ? 'scrolled' : ''"
  >
    <nav class="relative flex justify-between items-center px-6 py-4 md:py-5 w-full">
      <!-- Mobile Nav -->
      <MobileNav
        ref="mobileNav"
        :mobile-menu-open="mobileMenuOpen"
        :menu-items="mobileMenuItems"
        :active-link="activeLink as string"
        :set-active-link="setActiveLink"
        @toggle-mobile-menu="toggleMobileMenu"
      />

      <section class="hidden md:flex flex-1">
        <nav class="flex items-center gap-8">
          <RouterLink
            v-for="item in menuItems.slice(0, 3)"
            :key="item.label as string"
            :to="(item.to as string)"
            class="font-light text-xs uppercase tracking-wide nav-link-luxury"
            :class="activeLink === (item.label as string).toLowerCase() ? 'active font-bold' : ''"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </section>

      <!-- Center: Logo -->
      <section class="md:left-1/2 md:absolute flex flex-shrink-0 justify-center items-center md:-translate-x-1/2">
        <LogoComponent />
      </section>

      <!-- Right: Cart + dark mode -->
      <section class="flex flex-1 justify-end items-center gap-3 md:gap-5">
        <!-- Desktop right links -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="item in menuItems.slice(3)"
            :key="item.label as string"
            :to="(item.to as string)"
            class="font-light text-xs uppercase tracking-wide nav-link-luxury"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Cart Icon -->
        <UButton
          variant="link"
          :to="{ name: '/cart' }"
          color="neutral"
          class="relative hover:bg-transparent p-2 cursor-pointer"
        >
          <UIcon
            name="i-lucide-shopping-bag"
            class="size-5 transition-colors"
          />

          <span
            v-if="cartItemsCount > 0"
            class="-top-0.5 -right-0.5 absolute flex justify-center items-center rounded-full min-w-4 h-4 font-medium text-[9px] cart-badge"
          >
            {{ displayCartItemCount }}
          </span>
        </UButton>
      </section>
    </nav>
    <!-- Gold bottom border -->
    <div
      class="transition-opacity duration-500 gold-divider-full"
      :style="{ opacity: scrolled ? 1 : 0 }"
    />
  </header>
</template>

<style scoped>
.navbar-luxury {
  background: rgba(245, 240, 235, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(201, 168, 76, 0);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-luxury.scrolled {
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

/* Nav links */
.nav-link-luxury {
  color: #888888;
  position: relative;
  transition: color 0.3s ease;
  text-decoration: none;
}

.nav-link-luxury::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-gold-500, #c9a84c);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link-luxury:hover,
.nav-link-luxury.active {
  color: #0a0a0a;
}

.nav-link-luxury:hover::after,
.nav-link-luxury.active::after {
  transform: scaleX(1);
}

:deep(.nav-icon-luxury:hover) {
  color: var(--color-gold-500, #c9a84c);
}

/* Cart badge */
.cart-badge {
  background: var(--color-gold-500, #c9a84c);
  color: #0a0a0a;
  font-family: "Inter", sans-serif;
}
</style>
