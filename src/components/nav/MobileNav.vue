<script setup lang="ts">
import type { MenuItems } from '@/types/types'
import { watch } from 'vue'

const props = defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
  menuItems: {
    type: Array as () => MenuItems[],
    required: true,
  },
  activeLink: {
    type: String,
    required: true,
  },

  setActiveLink: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['toggle-mobile-menu'])

function toggleMobileMenu() {
  emit('toggle-mobile-menu')
}

watch(
  () => props.activeLink,
  (newVal) => {
    console.log('Active link updated: ' + newVal)
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <MobileToggle :mobile-menu-open="mobileMenuOpen" @toggle-mobile-menu="toggleMobileMenu" />

  <transition name="slide-down" mode="out-in">
    <div
      v-if="mobileMenuOpen"
      class="absolute top-full left-0 z-40 w-full overflow-hidden bg-(--ui-bg) shadow-lg md:hidden"
    >
      <nav class="container mx-auto">
        <ul class="flex flex-col divide-y divide-(--ui-border) rounded-lg">
          <li v-for="item in menuItems" :key="item.label" class="w-full" @click="setActiveLink()">
            <RouterLink
              :to="item.route"
              :class="[
                'block w-full px-6 py-4 text-lg font-medium transition-colors duration-200 ease-in-out',
                activeLink === item.route?.name?.toString()
                  ? 'active bg-(--ui-bg-accented) font-bold'
                  : 'text-(--ui-text-muted)',
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center justify-center gap-3 p-4">
          <RouterLink to="/login" class="w-full">
            <button
              class="w-full rounded-full bg-black px-4 py-3 text-center font-bold text-white shadow-md transition-all duration-200 hover:border-2 hover:bg-white/20 hover:text-black"
            >
              Login
            </button>
          </RouterLink>

          <RouterLink to="/signup" class="w-full">
            <button
              class="w-full rounded-full border-2 border-black bg-white px-4 py-3 text-center font-bold text-black transition-all duration-200 hover:bg-black hover:text-white"
            >
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
