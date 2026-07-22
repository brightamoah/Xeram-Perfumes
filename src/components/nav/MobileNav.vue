<script setup lang="ts">
import type { MenuItems } from "@/types/types";
import { watch } from "vue";

const { mobileMenuOpen, menuItems, activeLink, setActiveLink } = defineProps<{
  mobileMenuOpen: boolean;
  menuItems: MenuItems[];
  activeLink: string;
  setActiveLink: () => void;
}>();

const emit = defineEmits<{
  (e: "toggle-mobile-menu"): void;
}>();

function toggleMobileMenu() {
  emit("toggle-mobile-menu");
}

watch(
  () =>
    activeLink,
  () => {
    // console.log(`Active link updated: ${newVal}`);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<template>
  <MobileToggle
    :mobile-menu-open="mobileMenuOpen"
    @toggle-mobile-menu="toggleMobileMenu"
  />

  <transition
    name="slide-down"
    mode="out-in"
  >
    <div
      v-if="mobileMenuOpen"
      class="md:hidden top-full left-0 z-40 absolute bg-ivory-50 shadow-lg rounded-b-2xl w-full overflow-hidden"
    >
      <nav class="mx-auto container">
        <ul class="flex flex-col rounded-lg divide-y divide-default">
          <li
            v-for="item in menuItems"
            :key="item.label"
            class="w-full"
            @click="setActiveLink()"
          >
            <RouterLink
              :to="item.route"
              class="block px-6 py-4 rounded-3xl w-full font-medium text-lg transition-colors duration-200 ease-in-out"
              :class="[
                activeLink === item.route?.name?.toString()
                  ? 'active bg-amber-200/50 font-bold'
                  : 'text-muted',
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex justify-center items-center gap-3 p-4">
          <RouterLink
            :to="{ name: '/login' }"
            class="w-full"
          >
            <button class="bg-black hover:bg-white/20 shadow-md px-4 py-3 hover:border-2 rounded-full w-full font-bold text-white hover:text-black text-center transition-all duration-200">
              Login
            </button>
          </RouterLink>

          <RouterLink
            :to="{ name: '/signup' }"
            class="w-full"
          >
            <button class="bg-ivory-200 hover:bg-black px-4 py-3 border-2 border-black rounded-full w-full font-bold text-black hover:text-white text-center transition-all duration-200">
              Sign Up
            </button>
          </RouterLink>
        </div>
      </nav>
    </div>
  </transition>
</template>

<style scoped>
.active {
  font-style: normal;
  font-weight: 700;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
  max-height: 800px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}
</style>
